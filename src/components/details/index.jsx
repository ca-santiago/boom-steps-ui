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
import FlujoDetailsLoadingView from "../loading/flujoDetails";

import { RiLockPasswordFill } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { CopyTextIcon } from "../icons/icon.map";

import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

const FlujoDetailsView = ({ flujoId }) => {
    const [showEditor, setShowEditor] = React.useState(false);
    const [showPasscode, setShowPasscode] = React.useState(false);

    const link = React.useMemo(() => createShareLink(flujoId), [flujoId]);
    const { actions } = useManagerContext();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['flujoDetails', flujoId],
        queryFn: () => FlujoService.getFlujoById(flujoId),
        networkMode: 'offlineFirst',
        retry: false
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

    if (isLoading) return <FlujoDetailsLoadingView />;

    if (error || !data) {
        return <Card>
            <p className="font-semibold text-slate-500 text-center select-none">Clould not load this, please try again later</p>
        </Card>;
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

    const handleCopy = () => {
        try {
            copy(data.passcode);
            toast('📋 Copied to clipboard', { duration: 1100 });
        } catch (err) {
            console.log(err);
            toast.error('Could not copy, try again later');
        }
    }

    const NeedPasscode = ({ show }) => {
        return (
            <div className="flex gap-1 items-center text-slate-500">
                <div className="flex items-center text-center rounded-md bg-slate-200 border-slate-300 border justify-center">
                    <p className="font-semibold text-slate-600 select-none mx-1 -translate-y-[1px]">Passcode</p>
                    <div className="px-1">
                        {show ? <p className="tracking-widest -translate-y-[1px] select-none">{data.passcode}</p> : <p className="font-bold relative translate-y-[3px] select-none tracking-widest">********</p>}
                    </div>
                </div>
                <div className="rounded p-1 hover:bg-slate-300 cursor-pointer bg-slate-200 border border-slate-300 select-none" onClick={() => setShowPasscode(prev => !prev)}>
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
                <div className="rounded p-1 hover:bg-slate-300 cursor-pointer bg-slate-200 border border-slate-300 select-none">
                    <CopyTextIcon size={16} onClick={handleCopy} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <Card>
                <div className="grid grid-flow-row gap-3">
                    <div>
                        <div className="flex justify-between">
                            <p className="text-lg font-bold text-montserrat text-slate-800 whitespace-break-spaces leading-normal">{data.title}</p>
                            <div><p onClick={handleOpenEditClick} className="px-2 text-sky-600 font-semibold text-sm cursor-pointer">Edit</p></div>
                        </div>
                        <p className="text-wix text-xs font-medium text-slate-400">{moment(data.createdAt).format("MMMM Do, YYYY")} - {moment(data.createdAt).fromNow()}</p>
                        {data.description && (<p className="text-sm text-montserrat font-semibold text-slate-500 whitespace-break-spaces mt-1">{data.description}</p>)}
                    </div>

                    <div className="flex gap-3 flex-col">
                        <div className="grid grid-flow-col gap-2 justify-start">
                            {data.types.map(type => <FlujoStepIcon key={type} step={type} completed={data.completedSteps.includes(type)} />)}
                        </div>
                        <p className="text-sm font-semibold text-slate-500 flex gap-2 items-center pl-0.5"><BsClock />{data.completionTime} to complete</p>
                        {data.passcode && <NeedPasscode show={showPasscode} />}
                    </div>

                    <div className="flex justify-between items-center">
                        <p></p>
                        <FlujoStatusIndicator status={data.status} />
                    </div>
                </div>
            </Card>
            <Card>
                <h3 className="text-slate-700 text-sm font-semibold select-none">Share this flujo with someone else</h3>
                <CopyLink showOpenNow value={link} />
            </Card>
            <div className="flex flex-col gap-2">
                {data.types.map(s => <StepDetails key={s} stepName={s} flujoId={data.id} />)}
            </div>
        </div>
    );
}

export default FlujoDetailsView;