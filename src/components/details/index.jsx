import React from "react";
import FlujoService from "../../services/flujo";
import FlujoStepIcon from "../icons/FlujoStepIcon";
import CopyLink from "../utils/copy";
import { createShareLink } from "../../helpers/links";

const FlujoDetailsView = ({ flujoId }) => {
    const [flujoData, setFlujoData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const link = React.useMemo(() => createShareLink(flujoId), [flujoId]);

    const loadFlujoData = () => {
        FlujoService.getFlujoById(flujoId)
            .then((flujo) => {
                setFlujoData(flujo);
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }

    React.useEffect(() => {
        loadFlujoData();
    }, []);

    if (loading) {
        return <div>Loading please wait...</div>;
    }

    if (error || !flujoData) {
        return <div>Clould not load this, please try again later</div>;
    }

    return (
        <div className="w-full grid grid-flow-row gap-3 shadow-sm rounded-md border bg-white p-3">
            <div>
                <p className="text-lg font-bold text-montserrat text-gray-700 whitespace-break-spaces leading-normal">{flujoData.title}</p>
                {flujoData.description && (<p className="text-sm text-montserrat font-semibold text-gray-600 whitespace-break-spaces line-clamp-2 mt-2">{flujoData.description}</p>)}
            </div>
            <div className="grid grid-flow-col mt-3 gap-2 justify-start">
                {flujoData.types.map(type => <FlujoStepIcon key={type} step={type} completed={flujoData.completedSteps.includes(type)} />)}
            </div>
            <p className="text-md font-semibold text-gray-700">Status: {flujoData.status}</p>
            <p className="text-md font-semibold text-gray-700">Stimate: {flujoData.completionTime}</p>
            <div className="">
                <h3 className="text-gray-700 font-semibold">Share this flujo with someone else</h3>
                <CopyLink showOpenNow value={link} />
            </div>
        </div>
    );
}

export default FlujoDetailsView;