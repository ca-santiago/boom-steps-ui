
export const InputLabel = ({ text, description, className = "" }) => (
    <div className='px-1'>
        <p className={"text-wix font-semibold text-base text-slate-700 " + className}>{text}</p>
        {/* {description && (<p className='text-wix text-xs text-gray-500 py-1'>{description}</p>)} */}
    </div>
);
