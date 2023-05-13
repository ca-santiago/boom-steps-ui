import React from 'react';
import { useNavigate } from 'react-router-dom';

import useFlujoCreator from '../../hooks/useFlujoCreator';
import { FlujoServices } from '../../services/flujo';
/** Icons */
import { FaSignature } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
import { BsPersonFillAdd } from 'react-icons/bs';
/** Components */
import SelectableStepButton from './SelectableStep';

const InputLabel = ({ text, description }) => (
    <div className='px-1'>
        <p className='text-wix font-semibold text-base text-gray-700'>{text}</p>
        {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)}
    </div>
);


const FlujoCreator = ({ onCreate, onCreateError }) => {
    const navigate = useNavigate();
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

    function triggerCreate() {
        if (disable) return;
        setDisable(true);

        // Get State
        const { selected } = flujoCreator.getState();

        // Perform creation
        FlujoServices.createNewFlujo(selected)
            .then((data) => data.json())
            .then((payload) => {
                onCreate({ data: payload });
                // navigate(`/flujo/${id}?token=${token}`);
                setDisable(false);
            })
            .catch((err) => {
                if(onCreateError) {
                    onCreateError(err);
                }
                console.log('Got an error while creating flujo');
            });
    }

    const submitStyle = !flujoCreator.canCreate ? "btn-disabled" : "bg-accent";

    return (
        <div className="shadow rounded-md p-3">
            <h2 className="text-center text-montserrat font-semibold text-2xl text-gray-700">Create a new flujo</h2> 
            <div className='grid gap-3 mt-6'>
                <div>
                    <InputLabel text="Give it a title *" />
                    <input
                        name='title'
                        className='p-1 px-3 border rounded-md w-full mt-1 text-gray-600 text-sm text-montserrat select-none'
                        placeholder='Title'
                        type='text'
                    />
                </div>
                <div>
                    <InputLabel text="Give it a description" description="Max 200 chars" />
                    <textarea
                        name='description'
                        className='p-1 px-3 border rounded-md w-full mt-1 text-gray-600 text-sm text-montserrat select-none'
                        placeholder='Description'
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
            </div>
            <div className="w-full flex justify-end items-center mt-5">
                {/* {flujoCreator.canCreate === false && <p>Seleciona almenos uno</p>} */}
                <button
                    disabled={!flujoCreator.canCreate}
                    aria-disabled={!flujoCreator.canCreate}
                    className={`px-4 py-2 rounded-lg border ${submitStyle}`}
                    onClick={triggerCreate}
                >Create</button>
            </div>
        </div>
    );
}

export default FlujoCreator;