import React from "react";
import { createShareLink } from "../../helpers/links";
import CopyLink from "../utils/copy";

const LastCreatedLink = ({ flujo }) => {
    const link = React.useMemo(() => createShareLink(flujo.id), [flujo.id]);

    return (
        <div className="mt-4">
            <p className="font-medium text-normal text-gray-700 mb-2">Last created</p>
            <div className="grid grid-flow-row w-full shadow-sm rounded-lg bg-white p-3 ">
                <div className="text-wix text-base font-bold text-gray-700 line-clamp-2">
                    <span>{flujo.title}</span>
                </div>
                {flujo.description && <div className="text-montserrat text-xs font-bold text-gray-500 line-clamp-2">
                    <span>{flujo.description}</span>
                </div>}
                <div>
                    <h3>Some</h3>
                    <CopyLink showOpenNow value={link} />
                </div>
            </div>
        </div>
    );
}

export default LastCreatedLink;