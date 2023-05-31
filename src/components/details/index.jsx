import React from "react";
import FlujoService from "../../services/flujo";
import FlujoStepIcon from "../icons/FlujoStepIcon";
import CopyLink from "../utils/copy";
import { createShareLink } from "../../helpers/links";
import Card from "../shared/card";
import StepDetails from "./step";
import { useQuery } from "@tanstack/react-query";
import FlujoStatusIndicator from "./status";

const FlujoDetailsView = ({ flujoId }) => {
    const link = React.useMemo(() => createShareLink(flujoId), [flujoId]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['flujoDetails', flujoId],
        queryFn: () => FlujoService.getFlujoById(flujoId),
        networkMode: 'offlineFirst'
    });

    if (isLoading) return null;

    if (error || !data) {
        return <div>Clould not load this, please try again later</div>;
    }

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <div>
                    <p className="text-lg font-bold text-montserrat text-gray-700 whitespace-break-spaces leading-normal">{data.title}</p>
                    {data.description && (<p className="text-sm text-montserrat font-semibold text-gray-600 whitespace-break-spaces line-clamp-2 mt-2">{data.description}</p>)}
                </div>
                <div className="grid grid-flow-col mt-3 gap-2 justify-start">
                    {data.types.map(type => <FlujoStepIcon key={type} step={type} completed={data.completedSteps.includes(type)} />)}
                </div>
                <FlujoStatusIndicator status={data.status} />
                <p className="text-md font-semibold text-gray-700">Stimate: {data.completionTime}</p>
                <div className="">
                    <h3 className="text-gray-700 font-semibold">Share this flujo with someone else</h3>
                    <CopyLink showOpenNow value={link} />
                </div>
            </Card>
            <div className="flex flex-col gap-2">
                {data.types.map(s => <StepDetails key={s} stepName={s} flujoId={data.id} />)}
            </div>
        </div>
    );
}

export default FlujoDetailsView;