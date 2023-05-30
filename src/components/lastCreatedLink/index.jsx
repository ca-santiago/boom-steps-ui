import React from "react";
import { createShareLink } from "../../helpers/links";
import { OpenOnNewTabIcon } from "../icons/icon.map";
import CopyText from "../utils/copy";

const LastCreatedLink = ({ flujo }) => {
    const link = React.useMemo(() => createShareLink(flujo.id), [flujo.id]);

    const handleOpenNewTab = () => {
        window.open(link, '_blank')
    }

    return (
        <div className="mt-4">
            <p className="ml-1 font-medium text-normal text-gray-700 mb-2">Last created</p>
            <div className="grid grid-flow-row w-full shadow-sm rounded-lg bg-white justify-between p-3 items-center">
                <div className="text-wix text-base font-bold text-gray-700 line-clamp-2">
                    <span>{flujo.title}</span>
                </div>
                {flujo.description && <div className="text-montserrat text-xs font-bold text-gray-500 line-clamp-2">
                    <span>{flujo.description}</span>
                </div>}

                <div className="grid grid-flow-col mt-3 item-center gap-2 justify-center">
                    <CopyText value={link} />
                    <div onClick={handleOpenNewTab} className="flex justify-center items-center rounded-full bg-gray-200 p-1.5 text-gray-600 cursor-pointer">
                        <OpenOnNewTabIcon size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastCreatedLink;