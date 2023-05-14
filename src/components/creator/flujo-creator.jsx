import React from 'react';
import useFlujoCreator from '../../hooks/useFlujoCreator';
import { FlujoServices } from '../../services/flujo';
/** Icons */
import { FaSignature } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
import { BsPersonFillAdd } from 'react-icons/bs';
/** Components */
import SelectableStepButton from './SelectableStep';
import { useForm } from 'react-hook-form';

const InputLabel = ({ text, description }) => (
    <div className='px-1'>
        <p className='text-wix font-semibold text-base text-gray-700'>{text}</p>
        {/* {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)} */}
    </div>
);

const inputClassNames = 'p-2 mt-1 border border-gray-300 rounded-md w-full text-gray-500 text-xs text-montserrat select-none bg-gray-200 max-h-48';

const FlujoCreator = ({ onCreate, onCreateError }) => {
    // const navigate = useNavigate();

    const {register, formState, trigger, handleSubmit, reset} = useForm();
    const [disable, setDisable] = React.useState(false);
    const flujoCreator = useFlujoCreator();

    function toggleSelectStep(name) {
        return function (active) {
            if (active) {
                flujoCreator.addStep(name);
            } else {
                flujoCreator.removeStep(name)
            }
        }
    }

    const resetForm = () => {
        reset();
    }

    function triggerCreate(formData) {
        if (disable) return;
        
        // Get State
        const steps = flujoCreator.getState();
        const { title, description, time2complete } = formData;
        
        // Validate
        if(steps.length < 1 || !formState.isValid) {
            return;
        }
        
        setDisable(true);
        const args = { steps, title, description, completionTime: time2complete};
        // Perform creation
        FlujoServices.createNewFlujo(args)
            .then((data) => data.json())
            .then((payload) => {
                if(onCreate) onCreate({ data: payload });
                setDisable(false);
                resetForm();
            })
            .catch((err) => {
                if(onCreateError) {
                    onCreateError(err);
                }
                console.log('Got an error while creating flujo');
            });
    }

    const disableCreate = React.useMemo(() => {
        return formState.errors.length > 0 || !flujoCreator.canCreate;
    }, [formState.errors, flujoCreator.canCreate]);

    const submitStyle = disableCreate ? "btn-disabled" : "bg-accent";

    return (
        <div className="shadow rounded-md p-3">
            <h2 className="text-center text-montserrat font-semibold text-2xl text-gray-700">Create a new flujo</h2> 
            <div className='grid gap-3 mt-6'>
                <div>
                    <InputLabel text="Give it a title *" />
                    <input
                        name='title'
                        className={inputClassNames}
                        placeholder='Title'
                        type='text'
                        {...register("title", {
                            required: true,
                            min: 3,
                            max: 120,
                            onBlur: () => trigger('title')
                        })}
                    />
                    {formState.errors.title && (<p className='text-xs text-red-400 p-1'>Please provide a title</p>)}
                </div>
                <div>
                    <InputLabel text="Give it a description" description="Max 200 chars" />
                    <textarea
                        name='description'
                        className={inputClassNames}
                        placeholder='Description'
                        {...register('description')}
                    />
                </div>
                <div>
                    <InputLabel text="Select steps *" />
                    <div className='grid gap-2 mt-2 text-gray-600'>
                        <SelectableStepButton
                            title="Camera validaiton"
                            onSelectChange={toggleSelectStep('FACE')}
                            icon={<AiFillCamera />}
                        />
                        <SelectableStepButton
                            title="Contact information"
                            onSelectChange={toggleSelectStep('PERSONAL_DATA')}
                            icon={<BsPersonFillAdd />}
                        />
                        <SelectableStepButton
                            title="Digital signature"
                            onSelectChange={toggleSelectStep('SIGNATURE')}
                            icon={<FaSignature />}
                        />
                    </div>
                </div>
                <div>
                    <InputLabel text="Time to complete" />
                    <input
                        placeholder='10m'
                        className={inputClassNames}
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
                    className={`px-4 py-2 rounded-lg border ${submitStyle}`}
                    onClick={handleSubmit(triggerCreate)}
                >Create</button>
            </div>
        </div>
    );
}

export default FlujoCreator;