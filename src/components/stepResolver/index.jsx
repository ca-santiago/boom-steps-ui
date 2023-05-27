import React from 'react';
import useStepController from '../../hooks/useStepCreator';
import { useCompletionContext } from '../../context/completion';
import { BsClockFill } from 'react-icons/bs';

function formatTime(seconds) {
    // Calculate the number of minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Format the time as "minutes:seconds"
    var formattedTime = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

    return formattedTime;
}

function StepResolver() {
    const { secondsLeft: _secLeft, flujo } = useCompletionContext().state;
    const [secondsLeft, setSecondsLeft] = React.useState(_secLeft);

    React.useEffect(() => {
        // Decrease the countdown every second
        const timer = setInterval(() => {
            setSecondsLeft(prevSeconds => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, []);

    const Resolver = useStepController({ steps: flujo.types, completed: flujo.completedSteps });

    return (
        <div className="flex-1 flex flex-row w-full mt-10 mx-1 sm:mx-10">
            <div className="w-1/3 pt-5 pr-5 justify-center hidden sm:flex">
                <Resolver.Indicator />
            </div>
            <div className="max-h-fit w-full">
                <div className="flex items-center m-1 text-montserrat font-semibold text-gray-500 text-sm">
                    <BsClockFill /><p className="ml-1"> {formatTime(secondsLeft)} left</p>
                </div>
                <div className="bg-white shadow-sm rounded-lg flex-1 p-5">
                    <Resolver.StepComponent />
                </div>
            </div>
        </div>
    );
}

export default StepResolver;
