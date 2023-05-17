import React from 'react';
import MakeStepIndicatorIcon, { StatusIcon, OptionsIcon } from '../makeStepIndicator';

function FlujoStepIcon(item) {
    return (
        <div key={item} className="text-gray-600">
            {MakeStepIndicatorIcon(item)}
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
                <OptionsIcon />
            </div>
        </div>
    );
}

export default FlujoCard;