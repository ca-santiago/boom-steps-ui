import React from 'react';
import StepIndicator from '../components/stepResolver/stepIndicator';
import { toast } from 'react-hot-toast';
import { getFlujoStatus } from '../domain/steps';

export default function useStepController({ steps = [], completed }) {
  const [customCurrentStep, setCurrStep] = React.useState(steps[0]);
  
  const [completedSteps, setCompletedSteps] = React.useState(completed);
  const { currStep, applicableSteps } = getFlujoStatus(completed, steps);

  const clickIndicator = React.useCallback(function (value) {
    setCurrStep(value);
  }, []);

  const onStepCompleted = React.useCallback(function (value) {
    toast.success('Step completed');
    if (completedSteps.includes(value)) return;

    setCompletedSteps([...completedSteps, value]);
  }, [completedSteps]);

  const Indicator = React.useMemo(() => () => (
    <StepIndicator
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

  return {
    Indicator,
    StepComponent
  }
}
