import MakeStepIndicatorIcon from "../makeStepIndicator";

export const IconGrayBg = ({ children }) => (
    <div className="py-1 px-2 border rounded-full bg-zinc-200" >
        <div className="text-gray-600">
            {children}
        </div>
    </div >
);

function FlujoStepIcon({ step }) {
    return (
        <IconGrayBg>
            {MakeStepIndicatorIcon(step)}
        </IconGrayBg>
    );
}

export default FlujoStepIcon;