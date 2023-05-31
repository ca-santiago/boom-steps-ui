import React from 'react';
import MenuItem from '../dropdown/menuItem';
import { OptionsIcon, ShareLinkIcon } from '../icons/icon.map';
import FlujoStepIcon from '../icons/FlujoStepIcon';
import { toast } from 'react-hot-toast';
import { createShareLink } from '../../helpers/links';
import copy from 'copy-to-clipboard';
import FlujoStatusIndicator from '../details/status';

const FlujoCard = (props) => {
    const { onClickOpenDetails } = props;
    const { types, title, description, id, completedSteps, status } = props.data;
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

    const handleCopy = () => {
        try {
            const l = createShareLink(id);
            copy(l);
            toast('📋 Link copied to clipboard', { duration: 900 });
        } catch (err) {
            toast.error('Could not copy, try again later');
        }
    }

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
                <div className="grid grid-flow-col justify-between mt-3">
                    <div className="grid grid-flow-col justify-start gap-2">
                        {types.map(type => <FlujoStepIcon key={type} step={type} completed={completedSteps.includes(type)} />)}
                        <FlujoStatusIndicator status={status} />
                    </div>
                    <div className="cursor-pointer" onClick={handleCopy}>
                        <div className="py-1 px-2 border rounded-full bg-slate-200" >
                            <div className="text-gray-600">
                                <ShareLinkIcon />
                            </div>
                        </div >
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FlujoCard;