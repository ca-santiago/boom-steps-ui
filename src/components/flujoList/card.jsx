import React from 'react';
import MenuItem from '../dropdown/menuItem';
import { OptionsIcon } from '../icons/icon.map';
import FlujoStepIcon from '../icons/FlujoStepIcon';

const FlujoCard = ({ createdAt, status, types, completionTime, title, description, onClickOpenDetails }) => {
    const [optionsOpen, setOptionsOpen] = React.useState(false);

    const handleClickOptionsIcon = () => {
        setOptionsOpen(prev => !prev);
    }

    const closeOptions = () => {
        setOptionsOpen(false);
    }

    const dropdownMenu = (
        <div className="z-50 absolute display-none1 right-0 bg-white shadow-gray-300 shadow-lg py-2 rounded-md">
            <MenuItem text="Details" onClick={onClickOpenDetails} />
            <MenuItem text="Delete" />
        </div>
    );

    const CardOptionsEl = () => (
        <div className="">
            <div
                className="text-gray-600 relative inline-block select-none pl-2"
                onMouseLeave={closeOptions}
            >
                <div className='inline-block'>
                    <OptionsIcon onClick={handleClickOptionsIcon} />
                    {optionsOpen && dropdownMenu}
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col shadow-sm h-full bg-white rounded-lg p-2.5 justify-between max-w-full text-wix'>

            <div className="flex-1 flex flex-row justify-between max-w-full" >
                <div className="flex-1 max-w-full">
                    <p onClick={onClickOpenDetails} className="whitespace-break-spaces line-clamp-2 text-base font-bold text-gray-600 hover:underline hover:cursor-pointer leading-none">{title}</p>
                </div>
                <CardOptionsEl />
            </div>
            <div className="flex flex-col justify-between break-words whitespace-break-spaces">
                <div className="m-w-2">
                    {description && <p className="mt-1 text-wix text-xs font-semibold text-gray-500 line-clamp-2">{description}</p>}
                </div>
                <div className="grid grid-flow-col justify-start mt-3 gap-2">
                    {types.map(type => <FlujoStepIcon key={type} step={type} />)}
                </div>
            </div>

        </div>
    );
}

export default FlujoCard;