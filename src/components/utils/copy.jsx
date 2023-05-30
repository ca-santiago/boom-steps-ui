import { toast } from "react-hot-toast";
import { CopyTextIcon } from "../icons/icon.map";
import copy from "copy-to-clipboard";

const CopyText = ({ value }) => {
    const handleCopy = () => {
        try {
            copy(value);
            toast('📋 Copied to clipboard', { duration: 1100 });
        } catch (err) {
            console.log(err);
            toast.error('Could not copy, try again later');
        }
    }

    return (
        <div className="grid grid-flow-col py-1 px-3 rounded-full bg-gray-200 items-center justify-center">
            <p className="text-sm text-gray-400 line-clamp-1">{value}</p>
            <CopyTextIcon onClick={handleCopy} size={18} className="text-gray-600 cursor-pointer" />
        </div>
    );
}

export default CopyText;