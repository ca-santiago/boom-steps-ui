import React from 'react';
import FlujoService from '../../services/flujo';
import { toast } from 'react-hot-toast';

/** Components */
import SelectableStepButton from './SelectableStep';
import { useForm } from 'react-hook-form';
import { ContactInfoIcon, DigSignatureIcon, FaceIdIcon } from '../icons/icon.map';
import { ContactInfoStepName, FaceStepName, SignatureStepName } from '../../domain/steps/types';
import { useManagerContext } from '../../context/manager';
import LastCreatedLink from '../lastCreatedLink';
import { InputLabel } from '../utils/input';

const FlujoCreator = () => {
    const { actions, state } = useManagerContext();
    const [disable, setDisable] = React.useState(false);
    const [selectedSteps, setSelectedSteps] = React.useState([]);

    const { register, formState, handleSubmit, reset } = useForm({ mode: 'all' });

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
        const { title, description, time2complete, passcode } = formData;

        // Validate
        if (selectedSteps.length < 1 || !formState.isValid) {
            return;
        }

        setDisable(true);
        const args = { steps: selectedSteps, title, description, completionTime: time2complete, passcode };
        // Perform creation
        FlujoService.createNewFlujo(args)
            .then((data) => data.json())
            .then((payload) => {
                actions.addFlujo(payload.data);
                resetForm();
                toast.success('Flujo created');
            })
            .catch((err) => {
                console.log('Got an error while creating flujo');
            })
            .finally(() => {
                setDisable(false);
            })
    }

    const disableCreate = React.useMemo(() => {
        return !formState.isValid || !selectedSteps.length > 0;
    }, [formState.isValid, selectedSteps.length]);

    const submitStyle = disableCreate ? "bg-slate-300 text-gray-100" : "bg-accent";

    return (
        <div>
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
                                selected={selectedSteps.includes(FaceStepName)}
                                title="Camera validaiton"
                                onSelectChange={toggleSelectStep(FaceStepName)}
                                icon={<FaceIdIcon />}
                            />
                            <SelectableStepButton
                                selected={selectedSteps.includes(ContactInfoStepName)}
                                title="Contact information"
                                onSelectChange={toggleSelectStep(ContactInfoStepName)}
                                icon={<ContactInfoIcon />}
                            />
                            <SelectableStepButton
                                selected={selectedSteps.includes(SignatureStepName)}
                                title="Digital signature"
                                onSelectChange={toggleSelectStep(SignatureStepName)}
                                icon={<DigSignatureIcon />}
                            />
                        </div>
                    </div>
                    <div>
                        <InputLabel text="Use passcode" />
                        <input
                            placeholder='6587fddb'
                            className="form-input-field"
                            {...register('passcode', {
                                required: false,
                                pattern: {
                                    value: /^[A-Za-z0-9]{8}$/,
                                    message: 'Use 8 alphanumeric chars'
                                }
                            })}
                        />
                        {formState.errors.passcode?.type === "pattern" && (<p className='text-xs text-red-400 p-1'>{formState.errors.passcode.message}</p>)}
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
                        className={`px-4 w-full py-2 rounded-lg font-semibold border select-none ${submitStyle}`}
                        onClick={handleSubmit(triggerCreate)}
                    >Create</button>
                </div>
            </div>
            {state.lastCreated && <LastCreatedLink flujo={state.lastCreated} />}
        </div>
    );
}

export default FlujoCreator;