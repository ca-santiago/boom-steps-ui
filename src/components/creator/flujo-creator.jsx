import React from 'react';
import { FlujoServices } from '../../services/flujo';
import { toast } from 'react-hot-toast';

/** Components */
import SelectableStepButton from './SelectableStep';
import { useForm } from 'react-hook-form';
import { CameraValidationIcon, ContactInfoIcon, DigSignatureIcon } from '../makeStepIndicator';

const InputLabel = ({ text, description }) => (
    <div className='px-1'>
        <p className='text-wix font-semibold text-base text-gray-700'>{text}</p>
        {/* {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)} */}
    </div>
);

const inputClassNames = 'p-2 mt-1 border border-gray-300 rounded-md w-full text-gray-500 text-xs text-montserrat select-none bg-gray-200 max-h-48';

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
        return formState.errors.length > 0 || !selectedSteps.length > 0;
    }, [formState.errors, selectedSteps.length]);

    const submitStyle = disableCreate ? "btn-disabled" : "bg-accent";

    return (
        <div className="shadow rounded-md p-3">
            <h2 className="text-center text-montserrat font-semibold text-2xl text-gray-700">Create a new flujo</h2>
            <div className='grid gap-3 mt-6'>
                <div>
                    <InputLabel text="Give it a title *" />
                    <input
                        className={inputClassNames}
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
                        className={inputClassNames}
                        placeholder='Description'
                        autoComplete='off'
                        {...register('description', {
                            required: false,
                            maxLength: 120
                        })}
                    />
                    {formState.errors.description && <p>Error on description</p>}
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