import { toast } from "react-hot-toast";
import { CopyTextIcon, OpenOnNewTabIcon } from "../icons/icon.map";
import copy from "copy-to-clipboard";

const CopyLink = ({ value, showOpenNow }) => {
    const handleCopy = () => {
        try {
            copy(value);
            toast('📋 Copied to clipboard', { duration: 1100 });
        } catch (err) {
            console.log(err);
            toast.error('Could not copy, try again later');
        }
    }

    const handleOpenNewTab = () => {
        window.open(value, '_blank')
    }

    return (
        <div className="flex flex-row mt-2 gap-2 whitespace-normal w-full">
            <div className="flex py-1 px-3 rounded-full bg-gray-200 items-center justify-between w-full ">
                <p className="text-xs text-gray-400 line-clamp-1">{value}</p>
                <CopyTextIcon onClick={handleCopy} size={18} className="text-gray-600 cursor-pointer" />
            </div>
            {showOpenNow && (
                <div onClick={handleOpenNewTab} className="flex justify-center items-center rounded-full bg-gray-200 p-1.5 mx-auto my-auto text-gray-600 cursor-pointer">
                    <OpenOnNewTabIcon size={16} />
                </div>
            )}
        </div>
    );
}

export default CopyLink;