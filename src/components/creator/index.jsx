import React from 'react';
import { FlujoServices } from '../../services/flujo';
import { toast } from 'react-hot-toast';

/** Components */
import SelectableStepButton from './SelectableStep';
import { useForm } from 'react-hook-form';
import { ContactInfoIcon, DigSignatureIcon, CameraValidationIcon } from '../icons/icon.map';

const InputLabel = ({ text, description }) => (
    <div className='px-1'>
        <p className='text-wix font-semibold text-base text-gray-700'>{text}</p>
        {/* {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)} */}
    </div>
);

const FlujoCreator = ({ onCreate, onCreateError }) => {
    const { register, formState, handleSubmit, reset } = useForm({ mode: 'all' });
    const [disable, setDisable] = React.useState(false);
    const [selectedSteps, setSelectedSteps] = React.useState([]);

    function toggleSelectStep(name) {
        return function (active) {
            setSelectedSteps(prev => {
                return active ? [...prev, name] : [...prev].filter(val => val !== name);
            });
        }
    }

    const resetForm = React.useCallback(() => {
        setSelectedSteps([]);
        reset({
            title: '',
            description: '',
            time2complete: ''
        });
    }, [reset]);

    function triggerCreate(formData) {
        if (disable) return;

        // Get State
        const { title, description, time2complete } = formData;
        console.log({ selectedSteps, isValid: formState.isValid })

        // Validate
        if (selectedSteps.length < 1 || !formState.isValid) {
            return;
        }

        setDisable(true);
        const args = { steps: selectedSteps, title, description, completionTime: time2complete };
        // Perform creation
        FlujoServices.createNewFlujo(args)
            .then((data) => data.json())
            .then((payload) => {
                if (onCreate) onCreate(payload.data);
                resetForm();
                toast.success('Flujo created');
            })
            .catch((err) => {
                if (onCreateError) onCreateError(err);
                console.log('Got an error while creating flujo');
            })
            .finally(() => {
                setDisable(false);
            })
    }

    const disableCreate = React.useMemo(() => {
        return !formState.isValid || !selectedSteps.length > 0;
    }, [formState.isValid, selectedSteps.length]);

    const submitStyle = disableCreate ? "bg-gray-400 text-gray-100" : "bg-accent";

    return (
        <div className="shadow-sm border rounded-md p-3 lg:mx-auto bg-white w-full">
            <h2 className="text-center text-montserrat font-semibold text-2xl text-gray-700">Create a new flujo</h2>
            <div className='grid gap-3 mt-6'>
                <div>
                    <InputLabel text="Give it a title *" />
                    <input
                        className="form-input-field"
                        placeholder='Title'
                        type='text'
                        {...register("title", {
                            required: true,
                            minLength: 1,
                            maxLength: 120,
                            pattern: /^[\s\S]*$/
                        })}
                    />
                    {formState.errors.title && (<p className='text-xs text-red-400 p-1'>Please provide a title</p>)}
                </div>
                <div>
                    <InputLabel text="Give it a description" description="Max 200 chars" />
                    <textarea
                        className="form-input-field"
                        placeholder='Description'
                        autoComplete='off'
                        {...register('description', {
                            required: false,
                            maxLength: 260
                        })}
                    />
                    {formState.errors.description && <p className='text-xs text-red-400 p-1'>Description should be smaller than 260 chars</p>}
                </div>
                <div>
                    <InputLabel text="Select steps *" />
                    <div className='grid gap-2 mt-2 text-gray-600'>
                        <SelectableStepButton
                            selected={selectedSteps.includes("FACE")}
                            title="Camera validaiton"
                            onSelectChange={toggleSelectStep('FACE')}
                            icon={<CameraValidationIcon />}
                        />
                        <SelectableStepButton
                            selected={selectedSteps.includes("PERSONAL_DATA")}
                            title="Contact information"
                            onSelectChange={toggleSelectStep('PERSONAL_DATA')}
                            icon={<ContactInfoIcon />}
                        />
                        <SelectableStepButton
                            selected={selectedSteps.includes("SIGNATURE")}
                            title="Digital signature"
                            onSelectChange={toggleSelectStep('SIGNATURE')}
                            icon={<DigSignatureIcon />}
                        />
                    </div>
                </div>
                <div>
                    <InputLabel text="Time to complete" />
                    <input
                        placeholder='10m'
                        className="form-input-field"
                        {...register('time2complete', {
                            required: true,
                            pattern: /^\d+[hm]$/
                        })}
                    />
                    {formState.errors.time2complete && (<p className='text-xs text-red-400 p-1'>Only values in the next format (3h | 24m | 1h)</p>)}
                </div>
            </div>
            <div className="w-full flex justify-end items-center mt-5">
                <button
                    disabled={disableCreate}
                    aria-disabled={disableCreate}
                    className={`px-4 w-full py-2 rounded-lg border ${submitStyle}`}
                    onClick={handleSubmit(triggerCreate)}
                >Create</button>
            </div>
        </div>
    );
}

export default FlujoCreator;