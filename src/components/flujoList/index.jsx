import React from "react";
import FlujoCard from "./card";
import FlujoDetailsView from "../details";
import EmtyList from "./emptyList";
import { IoArrowBackOutline } from "react-icons/io5";

export default function FlujosList({ data }) {

    const [selected, setSelected] = React.useState(null);

    const handleOnCloseDetailView = () => {
        setSelected(null);
    }

    const handleOpenDetailsFor = (id) => {
        setSelected(id);
    }

    if (data.length < 1) return <EmtyList />;

    const headerText = selected ? "Detail view" : "Flujos list";

    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex items-center">
                {selected && (
                    <div onClick={handleOnCloseDetailView} className="p-1 rounded-full text-gray-700 hover:bg-slate-300 hover:text-gray-800">
                        <IoArrowBackOutline size={24} className="cursor-pointer" />
                    </div>
                )}
                <div className="text-gray-700 text-wix font-semibold text-xl ml-1">{headerText}</div>
            </div>
            <div className="overflow-scroll whitespace-nowrap no-scrollbar mt-3">
                {selected && (
                    <FlujoDetailsView flujoId={selected} onCloseClick={handleOnCloseDetailView} />
                )}
                {!selected && (
                    <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-2 gap-3">
                        {data.map((f) => (
                            <div key={f.id}>
                                <FlujoCard onClickOpenDetails={() => handleOpenDetailsFor(f.id)} {...f} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="md:py-3"></div>
            </div>
        </div>
    );
}
