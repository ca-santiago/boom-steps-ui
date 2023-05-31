import StepsManifest from "../../domain/steps/manifest";
import { StatusIcon } from "../stepResolver/makeStepIndicator";

const FlujoStatusIndicator = ({ status }) => {
    if(status === "CREATED") return null;

    return (
        <div>
            <div className="flex flex-row">
                <pre className="bg-slate-200 flex items-center p-1 px-2 text-wix font-semibold text-gray-600 text-sm rounded-full">{StepsManifest.flujoStatus.text[status]}: <StatusIcon status={status} /></pre>
            </div>
        </div>
    );
}

export default FlujoStatusIndicator;