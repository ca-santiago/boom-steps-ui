import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { FlujoServices } from "../../services/flujo";
import MakeStepIndicatorIcon from "../makeStepIndicator";

function FlujoStepIcon(item) {
    return (
        <div key={item} className="text-gray-600">
            {MakeStepIndicatorIcon(item)}
        </div>
    );
}

const FlujoDetailsView = ({ onCloseClick, flujoId, data }) => {
    const [flujoData, setFlujoData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const loadFlujoData = () => {
        FlujoServices.getFlujoById(flujoId)
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
        <div className="shadow-sm rounded-md border bg-white p-3">
            <div onClick={onCloseClick} className="">
                <IoArrowBackOutline size={20} className="cursor-pointer" />
            </div>
            <div className="mt-2 grid gap-2">
                <div>
                    <p className="text-lg font-semibold text-gray-700">{flujoData.title}</p>
                    {flujoData.description && (<p className="text-base font-semibold text-gray-600">{flujoData.description}</p>)}
                </div>
                <div className="flex">
                    {flujoData.types.map(FlujoStepIcon)}
                </div>
                <p className="text-md font-semibold text-gray-700">Status: {flujoData.status}</p>
                <p className="text-md font-semibold text-gray-700">Stimate: {flujoData.completionTime}</p>
            </div>
        </div>
    );
}

export default FlujoDetailsView;