import getFlujoStepIcon from "../makeStepIndicator";
import { FLujoDoneIcon } from "./icon.map";

function FlujoStepIcon({ step, completed }) {
    const Icon = getFlujoStepIcon(step);
    return (
        <div className="py-1 px-2 border rounded-full bg-zinc-200 relative" >
            {completed && <div className="absolute bottom-0 right-0 translate-x-1 -translate-y-3 z-10 text-green-600"><FLujoDoneIcon /></div>}
            <div className="text-gray-600 relative">
                <Icon />
            </div>
        </div >
    );
}

export default FlujoStepIcon;