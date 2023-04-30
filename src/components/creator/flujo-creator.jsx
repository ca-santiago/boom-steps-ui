import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFlujoCreator from '../../hooks/useFlujoCreator';

/***
 * Styles
 */
import {
    FaIdCard,
    FaFileSignature,
    FaCamera
} from 'react-icons/fa';

/**
 * Components
 */
import SelectableStepButton from '../SelectableStep';

const FlujoCreator = () => {
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
                const { id, token } = payload;
                navigate(`/flujo/${id}?token=${token}`);
                setDisable(false);
            })
            .catch(() => {
                console.log('Got an error while creating flujo');
            });
    }

    const submitStyle = !flujoCreator.canCreate ? "btn-disabled" : "";

    return (
        <>
            <div className="home-create-container container-card-style1">
                <h2 className="home-title">Create a new flujo</h2>
                <div className="selectable-container">
                    <SelectableStepButton
                        title="Validación con cámara"
                        onSelectChange={toggleSelectStep('FACE')}
                        icon={<FaCamera />}
                    />
                    <SelectableStepButton
                        title="Formulario"
                        onSelectChange={toggleSelectStep('PERSONAL_DATA')}
                        icon={<FaIdCard />}
                    />
                    <SelectableStepButton
                        title="Firma autógrafa"
                        onSelectChange={toggleSelectStep('SIGNATURE')}
                        icon={<FaFileSignature />}
                    />
                </div>
                <div className="create-btn-container">
                    {flujoCreator.canCreate === false && <p>Seleciona almenos uno</p>}
                    <button disabled={!flujoCreator.canCreate} className={`createflow-button ${submitStyle}`} onClick={triggerCreate}>Create</button>
                </div>
            </div>
        </>
    );
}

export default FlujoCreator;