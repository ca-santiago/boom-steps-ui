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
            <div className="flex rounded-full bg-slate-200 items-center justify-between w-full pl-3">
                <p className="text-xs text-gray-400 line-clamp-1">{value}</p>
                <div className="text-gray-500 cursor-pointer hover:bg-slate-300 p-1.5 rounded-full" >
                    <CopyTextIcon onClick={handleCopy} />
                </div>
            </div>
            {showOpenNow && (
                <div onClick={handleOpenNewTab} className="flex justify-center hover:bg-slate-300 items-center rounded-full bg-slate-200 p-1.5 mx-auto my-auto text-gray-600 cursor-pointer">
                    <OpenOnNewTabIcon size={16} />
                </div>
            )}
        </div>
    );
}

export default CopyLink;