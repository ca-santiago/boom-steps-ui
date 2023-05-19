import MakeStepIndicatorIcon from "../makeStepIndicator";

function FlujoStepIcon({ step }) {
    return (
        <div className="py-1 px-2 border rounded-full bg-zinc-200" >
            <div className="text-gray-600">
                {MakeStepIndicatorIcon(step)}
            </div>
        </div >
    );
}

export default FlujoStepIcon;