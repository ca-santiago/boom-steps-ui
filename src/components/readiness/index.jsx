import React from "react";
import getFlujoStepIcon from "../stepResolver/makeStepIndicator";
import { isFinished } from "../../helpers/flujos";
import { ErrorIcon } from "react-hot-toast";
import { FLujoDoneIcon } from "../icons/icon.map";
import { useCompletionContext } from "../../context/completion";
import CompletionService from "../../services/completion";
import StepsManifest from "../../domain/steps/manifest";
import { useForm } from "react-hook-form";
import { InputLabel } from "../utils/input";

const StepItem = ({ step }) => {
    const texts = StepsManifest.texts[step].readiness;
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

const ErrorMessage = ({ text }) => (
    <div className="w-full p-3 rounded-lg bg-red-400 grid grid-flow-col justify-start gap-3 items-center text-white font-semibold">
        <ErrorIcon /><p>{text}</p>
    </div>
)

const ReadinessView = ({ onStart }) => {
    const { flujo } = useCompletionContext().state;
    const { id, completionTime, types } = flujo;
    const [state, setState] = React.useState({
        loading: false,
        isFinished: isFinished(flujo),
        error: null
    });

    const { register, formState, handleSubmit } = useForm({ mode: 'all' });

    React.useEffect(() => {
        if (flujo.needPasscode) return;

        if (!state.isFinished || flujo.status === "STARTED") {
            startFLujo();
        }
    }, []);

    const startFLujo = React.useCallback((formData) => {
        setState(prev => ({
            ...prev,
            error: null,
            loading: true,
        }));

        CompletionService.startFlujo(id, formData?.passcode)
            .then(({ locked, forbidden, data }) => {
                const errorType = forbidden ? "FORBIDDEN" : "FINISHED";
                if (locked || forbidden) {
                    setState(prev => ({
                        ...prev,
                        error: errorType,
                        loading: false,
                        canStart: locked,
                    }));
                    return;
                }
                if (onStart) onStart(data);
            })
            .catch((err) => {
                setState(prev => ({
                    ...prev,
                    error: "SERVER",
                    loading: false,
                    canStart: true,
                }));
            });
    }, [id]);

    if (state.loading) return null;

    const btnDisabled = state.loading || !!formState.errors.passcode;
    const buttonStyles = "p-2 w-full md:w-auto px-4 shadow rounded-lg text-white text-wix text-lg font-semibold " + (btnDisabled ? "bg-slate-300 text-gray-100" : "bg-accent");

    return (
        <div className="flex md:flex-row flex-col h-screen max-h-screen w-full">
            <div className="sm:w-full h-auto md:h-full flex w-full md:w-2/3 lg:w-1/2">
                <div className="grid gap-10 grid-flow-row m-7 sm:m-auto md:mx-6 xl:mx-auto">
                    <div className="grid gap-8 grid-flow-row">
                        {types.map((t) => <StepItem key={t} step={t} />)}
                    </div>
                    {state.error === "SERVER" && <ErrorMessage text="Something went wrong, please try again" />}
                    {state.error === "FORBIDDEN" && <ErrorMessage text="Incorrect passcode, please try again" />}
                    <div>
                        {!state.isFinished && <p className="font-medium text-slate-500 text-right">You have {completionTime} to complete this flujo</p>}
                        {!state.isFinished && (
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex flex-col items-end">
                                    {flujo.needPasscode && (
                                        <div className="w-full md:max-w-[230px] justify-end items-end">
                                            <InputLabel text="Use your passcode" />
                                            <input
                                                type="password"
                                                placeholder='Passcode'
                                                className="form-input-field w-10 tracking-widest"
                                                {...register('passcode', {
                                                    required: true,
                                                    pattern: {
                                                        value: /^[A-Za-z0-9]{8}$/,
                                                        message: 'Use 8 alphanumeric chars'
                                                    }
                                                })}
                                            />
                                            {formState.errors.passcode?.type === "pattern" && (<p className='text-xs text-red-400 p-1'>{formState.errors.passcode.message}</p>)}
                                        </div>
                                    )}
                                    <div className="flex justify-center md:justify-end w-full mt-3">
                                        <button
                                            disabled={btnDisabled}
                                            onClick={handleSubmit(startFLujo)}
                                            className={buttonStyles}>Start</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {state.isFinished && (
                            <div className="flex justify-end mt-2 font-semibold text-gray-600 items-center">
                                <FLujoDoneIcon size={23} className="text-green-600" /> <p className="ml-2">This flujo has already been finished, thanks for participating</p>
                            </div>
                        )}
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