import React, { useCallback, useMemo, useState } from 'react';
import StepIndicator from '../components/stepIndicator';
import StepSwitcher from '../components/ComponentSwicher';
import FaceStep from '../components/steps/Face';
import FormStep from '../components/steps/Form';
import SignatureStep from '../components/steps/Signature';

export default function useStepController({ steps, completed }) {

  const [currStep, setCurrStep] = useState(steps[0]);
  const [completedSteps, setCompletedSteps] = useState(completed);

  const clickIndicator = useCallback(function(value) {
    setCurrStep(value);
  },[]);

  const onStepCompleted = useCallback(function(value){
    if(completedSteps.includes(value)) return;

    setCompletedSteps([...completedSteps, value]);
  }, [completedSteps, setCompletedSteps]);

  const canFinish = useMemo(() => completedSteps.length >= 3, [completedSteps]);

  const Indicator = useMemo(() => () => (
    <StepIndicator
      completedSteps={completedSteps}
      steps={steps}
      onClickIndicator={clickIndicator}
      currStep={currStep}
    />
  ),[steps, clickIndicator, currStep, completedSteps]);

  const stepsComponents = useMemo(()=> [
    { key: 'FACE', component: <FaceStep onCompleted={() => onStepCompleted('FACE')} />},
    { key: 'SIGNATURE', component: <SignatureStep  onCompleted={() => onStepCompleted('SIGNATURE')} />},
    { key: 'PERSONAL_DATA', component: <FormStep  onCompleted={() => onStepCompleted('PERSONAL_DATA')} />}
  ], [onStepCompleted]);

  const StepComponent = useMemo(() => () => (
    <StepSwitcher
      steps={stepsComponents}
      currentKey={currStep}
    />
  ),[stepsComponents, currStep]);

  return {
    Indicator,
    StepComponent,
    canFinish
  }
}
