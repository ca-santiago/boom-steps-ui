import React from 'react';
import useStepController from '../hooks/useStepCreator';

import './StepResolver.css';

function StepResolverView({ flujo }) {

  const Resolver = useStepController({ steps: flujo.types });

  return (
    <div className="step-resolver-container">
      <div className="steps-indicator-container">
          <Resolver.Indicator/>
      </div>
      <div className="step-component-container">
          <Resolver.StepComponent/>
      </div>
    </div>
  );
}

export default StepResolverView;
