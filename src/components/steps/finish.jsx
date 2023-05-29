import { toast } from "react-hot-toast";
import { useCompletionContext } from "../../context/completion";
import CompletionService from "../../services/completion";

const FinishFlujoStep = () => {
    const { state: { flujo, token }, actions } = useCompletionContext();

    const handleOnClick = () => {
        CompletionService.finishFlujo({ id: flujo.id, token })
            .then((res) => {
                if(res.resultType === 'ERROR') {
                    throw new Error('Cannot finish');
                }
                actions.refetch();
            })
            .catch(() => {
                toast.error('Whoops, something went wrong. Please try again');
            });
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