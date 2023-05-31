import { NoStepDataIcon } from "../icons/icon.map";


const NoStepDataYet = () => {
    return (
        <div className="w-full flex flex-col justify-center">
            <p className="text-center font-semibold text-lg text-zinc-500">No data yet</p>
            <div className="flex items-center justify-center w-full mt-2">
                <NoStepDataIcon size={24} className="text-rose-400" />
            </div>
        </div>
    );
}

export default NoStepDataYet;