import React from "react";
import FlujoCard from "./card";
import FlujoDetailsView from "../details";

export default function FlujosList({ data }) {

    const [selected, setSelected] = React.useState(null);

    const handleOnCloseDetailView = () => {
        setSelected(null);
    }

    const handleOpenDetailsFor = (id) => {
        setSelected(id);
    }

    if (data.length < 1) return (
        <div className="rounded-md border shadow p-3 text-center">
            <p className='text-montserrat font-semibold text-lg text-gray-500'>Let's start by creating a flujo</p>
        </div>
    );

    if (selected) {
        return <FlujoDetailsView flujoId={selected} onCloseClick={handleOnCloseDetailView} />
    }

    return (
        <div className="grid gap-3 md:max-h-screen overflow-scroll whitespace-nowrap no-scrollbar">
            <div className="grid grid-flow-row md:grid-cols-1 lg:grid-cols-2 gap-3">
                {data.map((f) => (
                    <div key={f.id}>
                        <FlujoCard onClickOpenDetails={() => handleOpenDetailsFor(f.id)} {...f} />
                    </div>
                ))}
            </div>
        </div>
    );
}
