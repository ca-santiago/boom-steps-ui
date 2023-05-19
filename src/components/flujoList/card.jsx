import React from 'react';
import MakeStepIndicatorIcon, { StatusIcon, OptionsIcon } from '../makeStepIndicator';
import MenuItem from '../dropdown/menuItem';

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
    const [optionsOpen, setOptionsOpen] = React.useState(false);

    const handleClickOptionsIcon = () => {
        setOptionsOpen(prev => !prev);
    }

    const closeOptions = () => {
        setOptionsOpen(false);
    }

    const dropdownMenu = (
        <div className="z-50 absolute display-none1 right-0 bg-white shadow-gray-300 shadow-lg py-2 rounded-md overflow-hidden">
            <MenuItem text="Details" onClick={onClickOpenDetails} />
            <MenuItem text="Delete" />
        </div>
    );

    return (
        <div className='flex border shadow-sm h-full bg-white rounded-md p-2 justify-between'>

            <div className="flex flex-col justify-between">
                <div className="m-w-2">
                    <p onClick={onClickOpenDetails} className="text-wix text-base font-bold text-gray-600 hover:underline hover:cursor-pointer">{title}</p>
                    {description && <p className="mt-1 text-wix text-xs font-semibold text-gray-500">{description}</p>}
                </div>
                <div className="grid grid-flow-col justify-start mt-2 gap-2">
                    {types.map(FlujoStepIcon)}
                </div>
            </div>

            <div
                className='p-1 text-gray-600 relative inline-block select-none px-3'
                onMouseLeave={closeOptions}
            >
                <div className='inline-block'>
                    <OptionsIcon onClick={handleClickOptionsIcon} />
                    {optionsOpen && dropdownMenu}
                </div>
            </div>
        </div>
    );
}

export default FlujoCard;