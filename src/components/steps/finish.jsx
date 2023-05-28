import { useCompletionContext } from "../../context/completion";
import CompletionService from "../../services/completion";

const FinishFlujoStep = ({ title }) => {
    const { state: { flujo, token } } = useCompletionContext();
    const handleOnClick = () => {
        CompletionService.finishFlujo({ id: flujo.id, token});
    }

    return (
        <div>
            <p className="step-title">We are all done</p>
            <div className="flex justify-center mt-10">
                <button onClick={handleOnClick} className="bg-accent text-white text-base font-semibold p-3 rounded-lg">Finish</button>
            </div>
        </div>
    );
}

export default FinishFlujoStep;