import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCompletionContext } from '../../context/completion';
import { StepServices } from '../../services/steps';
import { useParams } from 'react-router';

import PlaceSelector from '../placeSelector';
import PhoneInput from 'react-phone-number-input/input';
import { toast } from 'react-hot-toast';
import { isValidPhoneNumber } from 'react-phone-number-input';

const InputLabel = ({ text, description }) => (
  <div className='px-1'>
    <p className='text-wix font-semibold text-sm text-gray-700'>{text}</p>
    {/* {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)} */}
  </div>
);

function FormStep({ onCompleted }) {
  const { id } = useParams();
  const { state: { token } } = useCompletionContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all'
  });

  function submitForm(data) {
    StepServices.putContactInfo({
      birthDate: data.birthdate,
      bornPlace: data.place,
      email: data.email,
      fullname: data.fullname,
      phone: data.phone,
      flujoId: id,
      token,
    })
      .then(() => {
        onCompleted();
      })
      .catch(err => {
        toast.error('Something went wrong, please try again');
        console.log(err);
      })
  }

  const canSubmit = isValid;

  return (
    <>
      <h3 className="step-title">Formulario de datos personales</h3>
      <div className="w-1/2">
        <div className="mt-5 grid grid-flow-row gap-4">
          <div>
            <InputLabel text='Full name' />
            <input
              className={`form-input-field ${errors.fullname ? "form-input-error" : ""}`}
              {
              ...register("fullname", {
                required: true,
                maxLength: 64,
                minLength: 4,
              })
              }
              placeholder="Carmen Santiago"
            />
            {errors.fullname && <p className="input-error">Full name is required</p>}
          </div>
          <div>
            <InputLabel text="Phone number" />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                validate: isValidPhoneNumber
              }}
              render={({ field }) => (
                <PhoneInput
                  withCountryCallingCode
                  className={`form-input-field ${errors.phone ? "" : ""}`}
                  placeholder="+12 345 6789 0123"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {errors.phone && <p className="input-error">Use a phone number with country code</p>}
          </div>
          <div>
            <InputLabel text="Email" />
            <input
              className={`form-input-field ${errors.email ? "form-input-error" : ""}`}
              {...register("email", {
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              autoComplete="email"
              placeholder="example@mail.com"
              type="email"
            />
            {errors.email && <p className="input-error">Add a valid email</p>}
          </div>
          <div>
            <label className="input-label" htmlFor="birthdate">Fecha de nacimiento</label>
            <input
              className={`form-input-field ${errors.birthdate ? "form-input-error" : ""}`}
              {
              ...register("birthdate", {
                required: true
              })
              }
              type="date" placeholder="birth date"
            />
            {errors.birthdate && <p className="input-error">Requerido</p>}
          </div>
          <div>
            <InputLabel text="Location" />
            <Controller
              name="place"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PlaceSelector
                  inputStyle={`form-input-field ${errors.place ? "form-input-error" : ""}`}
                  containerStyle="w-full"
                  {...field}
                />
              )}
            />
            {errors.place && <p className="input-error">Select a location</p>}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-10">
        <button
          disabled={!canSubmit}
          onClick={handleSubmit(submitForm)}
          className={`p-2 px-3 rounded-md ${canSubmit ? "bg-accent" : "bg-gray-400 text-gray-100"}`}
        >Complete</button>
      </div>
    </>
  );
}

export default FormStep;
