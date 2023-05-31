
export const InlineLabelText = ({ label, text }) => {
    return (
        <div className="flex">
            <p className="font-semibold text-gray-700 mr-1">{label}:</p>
            <p className="font-normal text-base text-gray-500">{text}</p>
        </div>
    );
}
