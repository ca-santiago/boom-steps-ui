import React from 'react';
import { FLujoDoneIcon } from '../icons/icon.map';

const UnionLine = ({ remark }) => (
  <div className="h-14 w-full items-center justify-start flex ml-3.5">
    <div className={`w-1 h-full ${remark ? "bg-blue-700" : "bg-white"}`}></div>
  </div>
);

const UnionLineHorizontal = ({ remark }) => (
  <div className="w-full items-center justify-start flex">
    <div className={`h-1 w-full ${remark ? "bg-blue-700" : "bg-white"}`}></div>
  </div>
);


const Step = ({ icon, onClick, completed, active, drawNextIndicator, text }) => {
  const activeClasses = active ? "border-blue-600" : "border-transparent";
  const completedClasses = completed ? "bg-blue-600 text-white" : "bg-white";
  const textActiveClasses = active ? "font-bold text-gray-700" : "font-semibold";
  const Icon = icon;

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div
          onClick={onClick}
          className={`p-2 cursor-pointer border rounded-lg text-gray-700 relative ${activeClasses} ${completedClasses}`}
        >
          {completed && <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 z-10 text-green-600"><FLujoDoneIcon /></div>}
          <Icon />
        </div>
        {drawNextIndicator && <UnionLine remark={completed} />}
      </div>
      <p onClick={onClick} className={`pl-2 pt-1.5 select-none cursor-pointer text-sm text-gray-600 ${textActiveClasses}`}>{text}</p>
    </div>
  );
}

const StepHorizontal = ({ icon, onClick, completed, active, drawNextIndicator, text }) => {
  const activeClasses = active ? "border-blue-600" : "border-transparent";
  const completedClasses = completed ? "bg-blue-600 text-white" : "bg-white";
  const Icon = icon;

  return (
    <div className="flex w-full">
      <div className="">
        <div onClick={onClick}
          className={`p-2 cursor-pointer border rounded-lg text-gray-700 relative ${activeClasses} ${completedClasses}`}
        >
          {completed && <div className="absolute top-0 right-0 translate-x-1 -translate-y-1 z-10 text-green-600"><FLujoDoneIcon /></div>}
          <Icon />
        </div>
      </div>
      {drawNextIndicator && <UnionLineHorizontal remark={completed} />}
    </div>
  );
}

export function StepListIndicator(props) {
  const { steps, currStep, onClickIndicator, completedSteps } = props;

  return (
    <div className="flex flex-row sm:flex-col">
      {
        steps.map((s, index) => {
          const active = currStep.key === s.key;
          const completed = completedSteps.includes(s.key);
          const nextExists = index < steps.length - 1;

          const handleStepClick = () => onClickIndicator(s.key);

          return <Step key={s.key} onClick={handleStepClick} text={s.title} icon={s.icon} active={active} completed={completed} drawNextIndicator={nextExists} />;
        })
      }
    </div>
  );
}

export function MobileStepListIndicator(props) {
  const { steps, currStep, onClickIndicator, completedSteps } = props;
  return (
    <div className="flex flex-col w-full">
      <p className={`pl-1 select-none cursor-pointer text-lg font-bold text-gray-700`}>{currStep.title}</p>
      <div className="flex pt-3">
        {
          steps.map((s, index) => {
            const active = currStep.key === s.key;
            const completed = completedSteps.includes(s.key);
            const nextExists = index < steps.length - 1;

            const handleStepClick = () => onClickIndicator(s.key);

            return <StepHorizontal key={s.key} onClick={handleStepClick} text={s.title} icon={s.icon} active={active} completed={completed} drawNextIndicator={nextExists} />;
          })
        }
      </div>
    </div>
  );
}
