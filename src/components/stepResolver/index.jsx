import React from 'react';
import { useCompletionContext } from '../../context/completion';
import { BsClockFill } from 'react-icons/bs';
import { MobileStepListIndicator, StepListIndicator } from './stepIndicator';
import { getFlujoStatus } from '../../domain/steps';
import StepsManifest from '../../domain/steps/manifest';
import { toast } from 'react-hot-toast';

function formatTime(seconds) {
    // Calculate the number of minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Format the time as "minutes:seconds"
    var formattedTime = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    return formattedTime;
}

function StepResolver() {
    const [, setCurrStep] = React.useState(null);

    const { state: { flujo, secondsLeft: _secLeft }, actions } = useCompletionContext();
    const [secondsLeft, setSecondsLeft] = React.useState(_secLeft);

    const [completedSteps, setCompletedSteps] = React.useState(flujo.completedSteps);
    const { currStep, applicableSteps } = React.useMemo(() => getFlujoStatus(
        completedSteps,
        flujo.types
    ), [completedSteps, flujo.types]);

    React.useEffect(() => {
        // Decrease the countdown every second
        const timer = setInterval(() => {
            setSecondsLeft(prevSeconds => {
                const nextVal = prevSeconds - 1;
                if (nextVal <= 0) {
                    actions.refetch();
                }
                return prevSeconds > 0 ? nextVal : 0;
            }
            );
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, []);

    const clickIndicator = React.useCallback(function (value) {
        if (!StepsManifest.canUseNavigation) return;

        setCurrStep(value);
    }, []);

    const onStepCompleted = React.useCallback(function (value) {
        toast.success('Step completed');
        if (completedSteps.includes(value)) return;

        setCompletedSteps([...completedSteps, value]);
    }, [completedSteps]);

    const Indicator = React.useMemo(() => () => (
        <StepListIndicator
            steps={applicableSteps}
            completedSteps={completedSteps}
            onClickIndicator={clickIndicator}
            currStep={currStep}
        />
    ), [clickIndicator, currStep, completedSteps]);

    const IndicatorHorizontal = React.useMemo(() => () => (
        <MobileStepListIndicator
            steps={applicableSteps}
            completedSteps={completedSteps}
            onClickIndicator={clickIndicator}
            currStep={currStep}
        />
    ), [clickIndicator, currStep, completedSteps]);

    const StepComponent = React.useCallback(() => {
        const C = currStep.component;
        return (
            <C title={currStep.title} onCompleted={() => onStepCompleted(currStep.key)} />
        );
    }, [currStep]);


    return (
        <div className="flex-1 flex flex-col sm:flex-row w-full mt-2 sm:mt-10 mx-1 sm:mx-10">
            <div className="w-1/3 pt-5 pr-5 justify-center hidden sm:flex">
                <Indicator />
            </div>
            <div className="flex sm:hidden w-full justify-center">
                <IndicatorHorizontal />
            </div>
            <div className="max-h-fit pt-3 sm:pt-0 w-full">
                <div className="flex items-center m-1 text-montserrat font-semibold text-gray-500 text-sm">
                    <BsClockFill /><p className="ml-1"> {formatTime(secondsLeft)} left</p>
                </div>
                <div className="bg-white shadow-sm rounded-lg flex-1 p-5">
                    <StepComponent />
                </div>
            </div>
        </div>
    );
}

export default StepResolver;
