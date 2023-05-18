import { createShareLink } from "../../helpers/links";
import { OpenOnNewTabIcon, ShareLinkIcon } from "../makeStepIndicator";
import { toast } from 'react-hot-toast';

const LastCreatedLink = ({ flujo }) => {

    const handleCopy = () => {
        const l = createShareLink(flujo.id);
        navigator.clipboard.writeText(l)
        toast('📋 Link copied to clipboard', { duration: 900 });
    }

    const handleOpenNewTab = () => {
        const l = createShareLink(flujo.id);
        window.open(l, '_blank')
    }

    return (
        <div className="mt-4">
            <p className="ml-1 font-medium text-normal text-gray-700 mb-2">Last created</p>
            <div className="grid grid-flow-col w-full shadow-sm rounded bg-white justify-between p-3 items-center">
                <div className="text-wix text-sm font-bold text-gray-700">
                    <span>{flujo.title}</span>
                </div>
                <div className="grid grid-flow-col gap-2">
                    <div onClick={handleCopy} className="flex items-center rounded-full text-white bg-secondary w-9 h-9 justify-center cursor-pointer">
                        <ShareLinkIcon size={17} />
                    </div>
                    <div onClick={handleOpenNewTab} className="flex justify-center items-center rounded-full bg-secondary w-9 h-9 justify-center text-white cursor-pointer">
                        <OpenOnNewTabIcon size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastCreatedLink;