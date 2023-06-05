import React from "react";

const DetailsCard = React.memo(() => (
    <div className="bg-white h-52 w-full shadow-sm rounded-md border p-3 animate-pulse">
        <div class="h-3 bg-slate-200 rounded-full mb-2.5"></div>
        <div class="h-2 bg-slate-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-slate-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-slate-200 rounded-full  max-w-[260px] mb-2.5"></div>
        <div class="h-5"></div>
        <div className="flex gap-2">
            <div class="h-6 bg-slate-200 rounded-full w-6 mb-2.5"></div>
            <div class="h-6 bg-slate-200 rounded-full w-6 mb-2.5"></div>
            <div class="h-6 bg-slate-200 rounded-full w-6 mb-2.5"></div>
        </div>
    </div>
));

const StepCard = React.memo(() => (
    <div className="mt-5">
        <div class="ml-1 h-3 bg-slate-300 rounded-full max-w-[260px] mb-2.5 animate-pulse"></div>
        <div className="bg-white h-36 w-full shadow-sm rounded-md border p-3 animate-pulse">
            <div class="h-2 bg-slate-200 rounded-full  max-w-[360px] mt-2.5"></div>
            <div class="h-2 bg-slate-200 rounded-full  max-w-[360px] mt-2.5"></div>
        </div>
    </div>
));

const FlujoDetailsLoadingView = () => {
    return (
        <div>
            <DetailsCard />
            <div className="flex flex-col gap-3">
                <StepCard />
                <StepCard />
                <StepCard />
            </div>
        </div>
    );
}

export default FlujoDetailsLoadingView;