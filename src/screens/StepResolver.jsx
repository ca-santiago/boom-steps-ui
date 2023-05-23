import React from 'react';
import useStepController from '../hooks/useStepCreator';

import './StepResolver.css';
import { useCompletionContext } from '../context/completion';

function formatTime(seconds) {
  // Calculate the number of minutes and remaining seconds
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = seconds % 60;

  // Format the time as "minutes:seconds"
  var formattedTime = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

  return formattedTime;
}


function StepResolverView() {
  const { timeLeft, flujo } = useCompletionContext();
  const [secondsLeft, setSecondsLeft] = React.useState(timeLeft);

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
    <div className="step-resolver-container">
      <div>{formatTime(secondsLeft)}</div>
      <div className="steps-indicator-container">
        <Resolver.Indicator />
      </div>
      <div className="step-component-container">
        <Resolver.StepComponent />
      </div>
    </div>
  );
}

export default StepResolverView;
