import React, { useMemo } from 'react';
import getFlujoStepIcon from './makeStepIndicator';

import './stepindicator.css';
import { FLujoDoneIcon } from './icons/icon.map';

export default function StepIndicator({ steps, currStep, onClickIndicator, completedSteps }) {

  const components = useMemo(() => steps.map(function (s, index) {
    const active = currStep === s ? "active" : "";
    const completed = completedSteps.includes(s);

    const Icon = getFlujoStepIcon(s);

    return (
      <div key={s} className="indicator-step-container">
        <div
          onClick={() => onClickIndicator(s)}
          className={`step-indicator ${active} relative`}
        >
          {completed && <div className="absolute bottom-0 right-0 translate-x-1 -translate-y-3 z-10 text-green-600"><FLujoDoneIcon /></div>}
          <Icon />
        </div>
        {index < steps.length - 1 && <div className="step-line-union"></div>}
      </div>
    );
  }), [steps, onClickIndicator, currStep, completedSteps]);

  return (
    <>
      {
        components
      }
    </>
  );
}


