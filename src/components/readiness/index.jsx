import React from "react";
import { FlujoServices } from "../../services/flujo";
import getFlujoStepIcon from "../makeStepIndicator";
import { isFinished } from "../../helpers/flujos";
import { ErrorIcon } from "react-hot-toast";
import { FLujoDoneIcon } from "../icons/icon.map";

const TEXTS = {
    "FACE": {
        title: "Camera Validation - Record a short video of your face.",
        subtext: "Capture a quick video of your face to proceed.It'll only take a moment, we promise!"
    },
    "PERSONAL_DATA": {
        title: "Contact Information - Stay connected with us.",
        subtext: "Share your basic contact details with us, so we can keep in touch."
    },
    "SIGNATURE": {
        title: "Digital Signature - Sign with ease.",
        subtext: "We need your digital signature.It's just a simple step to finalize the process."
    }
}

const StepItem = ({ step }) => {
    const texts = TEXTS[step];
    if (!texts) return null;

    const StepIcon = getFlujoStepIcon(step);
    return (
        <div className="grid grid-flow-col gap-2 justify-start">
            <div>
                <div className="rounded-lg p-4 border bg-white text-gray-700">
                    <StepIcon size={22} className="" />
                </div>
            </div>
            <div>
                <p className="text-base md:text-lg font-bold text-montserrat text-gray-700">
                    {texts.title}
                </p>
                <p className="text-xs md:text-sm font-semibold text-montserrat text-gray-600 text-justify">
                    {texts.subtext}
                </p>
            </div>
        </div>
    );
}

const ReadinessView = ({ data, onStart }) => {
    const { types, id } = data;
    const [state, setState] = React.useState({
        loading: data.status === "STARTED",
        canStart: !isFinished(data),
        error: null
    });

    React.useEffect(() => {
        if (state.canStart && data.status === "STARTED") {
            startFLujo();
        }
    }, []);

    const startFLujo = React.useCallback(() => {
        setState(prev => ({
            ...prev,
            error: null,
            loading: true,
        }));

        FlujoServices.startFLujo(id)
            .then(({ isAllowed, ...payload }) => {
                if (!isAllowed) {
                    setState(prev => ({
                        ...prev,
                        error: false,
                        loading: false,
                        canStart: false,
                    }));
                    return;
                }
                if (onStart) onStart(payload);
            })
            .catch(err => {
                setState(prev => ({
                    ...prev,
                    error: false,
                    loading: false,
                    canStart: false,
                }));
                console.log(err);
            });
    }, [id]);

    const startSection = React.useMemo(() => (
        <>
            <p className="font-semibold text-gray-600 text-right">You have {data.completionTime} to complete this flujo</p>
            <div className="flex justify-center md:justify-end w-full mt-3">
                <button disabled={state.loading} onClick={startFLujo} className="p-2 w-full md:w-auto px-4 bg-accent shadow rounded-lg text-white text-wix text-lg font-semibold">Start</button>
            </div>
        </>
    ), [startFLujo, state.loading, state.completionTime]);

    const locked = React.useMemo(() => (
        <div className="flex justify-end mt-2 font-semibold text-gray-600 items-center">
            <FLujoDoneIcon size={23} className="text-green-600" /> <p className="ml-2">This flujo has already been finished, thanks for participating</p>
        </div>
    ), []);

    const errorMessage = React.useMemo(() => (
        <div className="w-full p-3 rounded-lg bg-red-400 grid grid-flow-col justify-start gap-3 items-center text-white font-semibold">
            <ErrorIcon /><p>Something went wrong, please try again</p>
        </div>
    ), []);

    if (state.loading) return null;

    return (
        <div className="flex md:flex-row flex-col h-screen max-h-screen w-full">
            <div className="sm:w-full h-auto md:h-full flex w-full md:w-2/3 lg:w-1/2">
                <div className="grid gap-10 grid-flow-row m-7 sm:m-auto md:mx-6 xl:mx-auto">
                    <div className="grid gap-8 grid-flow-row">
                        {types.map((t) => <StepItem key={t} step={t} />)}
                    </div>
                    <div>
                        {state.error && errorMessage}
                        {state.canStart && !state.error && startSection}
                        {!state.canStart && locked}
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/2 flex items-center justify-center">
                <img className="h-fit" src="https://img.freepik.com/premium-vector/getting-acceptance-letter-isolated-cartoon-vector-illustrations_107173-21753.jpg" />
            </div>
        </div>
    );
}

export default ReadinessView;