import React from "react";
import FlujoCard from "./card";
import FlujoDetailsView from "../details";
import EmtyList from "./emptyList";

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
            <div className="text-gray-700 font-semibold text-xl ml-1">{headerText}</div>
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
