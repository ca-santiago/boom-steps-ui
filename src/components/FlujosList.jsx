import React from 'react';
import MakeStepIndicatorIcon, { StatusIcon } from './makeStepIndicator';
import { SlOptionsVertical } from 'react-icons/sl';

export default function FlujosList({ data }) {

  if (data.length < 1) return (
    <div className="rounded-md border shadow p-3 text-center">
      <p className='text-montserrat font-semibold text-lg text-gray-500'>Let's start by creating a flujo</p>
    </div>
  );

  return (
    <div className="p-3 grid gap-2 md:max-h-screen overflow-scroll whitespace-nowrap no-scrollbar">
      {data.map((item, index, arr) => renderFlujo(item, index, arr.length))}
    </div>
  );
}

const FlujoCard = ({ createdAt, status, types, completionTime, title, description }) => {
  return (
    <div className='flex shadow rounded-md p-2 justify-between'>
      
      <div className="">
        <div className="m-w-2">
          <p className="text-wix text-base font-semibold text-gray-900">{title}</p>
          {description && <p className="text-wix text-xs font-normal text-gray-500">{description}</p>}
        </div>
        <div className="grid grid-flow-col mt-2 gap-2">
          {types.map(FlujoStepIcon)}
        </div>
      </div>

      <div className='items-center flex'>
        <StatusIcon status={status} />
      </div>

      <div className='p-1 text-gray-600'>
        <SlOptionsVertical />
      </div>
    </div>
  );
}

function renderFlujo(flujo) {
  return (
    <div key={flujo.id} className="">
      <FlujoCard {...flujo} />
    </div>
  );
}

function FlujoStepIcon(item) {
  return (
    <div key={item} className="text-gray-600">
      {MakeStepIndicatorIcon(item)}
    </div>
  );
}