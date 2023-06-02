import React from "react";
import FlujoService from "../../services/flujo";
import FlujoStepIcon from "../icons/FlujoStepIcon";
import CopyLink from "../utils/copy";
import { createShareLink } from "../../helpers/links";
import Card from "../shared/card";
import StepDetails from "./step";
import { useQuery } from "@tanstack/react-query";
import FlujoStatusIndicator from "./status";
import { useManagerContext } from "../../context/manager";
import FlujoEditor from "./edit";
import { BsClock } from "react-icons/bs";
import moment from "moment";

const FlujoDetailsView = ({ flujoId, onEditClick }) => {
    const [showEditor, setShowEditor] = React.useState(false);
    const link = React.useMemo(() => createShareLink(flujoId), [flujoId]);
    const { actions } = useManagerContext();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['flujoDetails', flujoId],
        queryFn: () => FlujoService.getFlujoById(flujoId),
        networkMode: 'offlineFirst'
    });

    const handleOpenEditClick = () => {
        setShowEditor(true);
    }

    const closeEditor = () => {
        setShowEditor(false);
    }

    React.useEffect(() => {
        if (data) {
            actions.updateFlujoData(data);
        }
    }, [data]);

    if (isLoading) return null;

    if (error || !data) {
        return <div>Clould not load this, please try again later</div>;
    }

    if (showEditor) return (
        <Card>
            <FlujoEditor
                onEditSave={(newData) => {
                    closeEditor();
                    refetch();
                }}
                onCancel={() => closeEditor()}
                flujo={data}
            />
        </Card>
    );

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <div className="grid grid-flow-row gap-3">
                    <div>
                        <div className="flex justify-between">
                            <p className="text-lg font-bold text-montserrat text-slate-800 whitespace-break-spaces leading-normal">{data.title}</p>
                            <div><p onClick={handleOpenEditClick} className="px-2 text-sky-600 font-semibold text-sm cursor-pointer">Edit</p></div>
                        </div>
                        {data.description && (<p className="text-sm text-montserrat font-semibold text-slate-500 whitespace-break-spaces mt-1">{data.description}</p>)}
                    </div>

                    <div className="grid grid-flow-col gap-2 justify-start">
                        {data.types.map(type => <FlujoStepIcon key={type} step={type} completed={data.completedSteps.includes(type)} />)}
                    </div>

                    <p className="text-wix text-xs font-normal text-slate-500">{moment(data.createdAt).format("MMMM Do, YYYY")} - {moment(data.createdAt).fromNow()}</p>

                    <p className="text-sm font-semibold text-slate-500 flex gap-1 items-center"><BsClock /> {data.completionTime} to complete</p>

                    <div className="flex justify-between items-center">
                        <p></p>
                        <FlujoStatusIndicator status={data.status} />
                    </div>
                </div>
            </Card>
            <Card>
                <h3 className="text-slate-700 text-sm font-semibold">Share this flujo with someone else</h3>
                <CopyLink showOpenNow value={link} />
            </Card>
            <div className="flex flex-col gap-2">
                {data.types.map(s => <StepDetails key={s} stepName={s} flujoId={data.id} />)}
            </div>
        </div>
    );
}

export default FlujoDetailsView;