import React from 'react';
import MakeStepIndicatorIcon, { StatusIcon, OptionsIcon } from '../makeStepIndicator';

function FlujoStepIcon(item) {
    return (
        <div key={item} className="py-1 px-2 border rounded-full bg-zinc-200" >
            <div className="text-gray-600">
                {MakeStepIndicatorIcon(item)}
            </div>
        </div >
    );
}

const FlujoCard = ({ createdAt, status, types, completionTime, title, description, onClickOpenDetails }) => {
    return (
        <div className='flex border shadow-sm h-full bg-white rounded-md p-2 justify-between'>

            <div className="flex flex-col justify-between">
                <div className="m-w-2">
                    <p onClick={onClickOpenDetails} className="text-wix text-base font-bold text-gray-600 hover:underline hover:cursor-pointer">{title}</p>
                    {description && <p className="mt-1 text-wix text-xs font-semibold text-gray-500">{description}</p>}
                </div>
                <div className="grid grid-flow-col justify-start  mt-2 gap-2">
                    {types.map(FlujoStepIcon)}
                </div>
            </div>

            {/* <div className='items-center flex'>
                <StatusIcon status={status} />
            </div> */}

            <div className='p-1 text-gray-600'>
                <OptionsIcon />
            </div>
        </div>
    );
}

export default FlujoCard;