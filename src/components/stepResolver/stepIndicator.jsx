import React, { useMemo } from 'react';
import getFlujoStepIcon from './makeStepIndicator';

import { FLujoDoneIcon } from '../icons/icon.map';

const UnionLine = ({ remark }) => (
  <div className="h-14 w-full items-center justify-start flex ml-3.5">
    <div className={`w-1 h-full ${remark ? "bg-blue-700" : "bg-white"}`}></div>
  </div>
);

export default function StepIndicator(props) {
  const { steps, currStep, onClickIndicator, completedSteps, stepNames } = props;

  const components = useMemo(() => steps.map(function (s, index) {
    const active = currStep === s;
    const completed = completedSteps.includes(s);

    const Icon = getFlujoStepIcon(s);
    const nextExists = index < steps.length - 1;

    const activeClasses = active ? "border-blue-600" : "border-transparent";
    const completedClasses = completed ? "bg-blue-600 text-white" : "bg-white";
    const textActiveClasses = active ? "font-bold text-gray-700" : "font-semibold";

    const handleStepClick = () => onClickIndicator(s);

    return (
      <div key={s} className="flex flex-row">
        <div className="flex flex-col">
          <div
            onClick={handleStepClick}
            className={`p-2 cursor-pointer border rounded-lg text-gray-700 relative ${activeClasses} ${completedClasses}`}
          >
            {completed && <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 z-10 text-green-600"><FLujoDoneIcon /></div>}
            <Icon />
          </div>
          {nextExists && <UnionLine remark={completed} />}
        </div>
        <p onClick={handleStepClick} className={`pl-2 pt-1.5 select-none cursor-pointer text-sm text-gray-600 ${textActiveClasses}`}>{stepNames[s]}</p>
      </div>
    );
  }), [steps, onClickIndicator, currStep, completedSteps]);

  return (
    <div>
      {components}
    </div>
  );
}


