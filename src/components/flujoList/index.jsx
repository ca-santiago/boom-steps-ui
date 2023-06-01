import React, { memo, useState } from "react";
import FlujoCard from "./card";
import FlujoDetailsView from "../details";
import EmtyList from "./emptyList";
import { IoArrowBackOutline } from "react-icons/io5";
import { useManagerContext } from "../../context/manager";
import FlujoService from "../../services/flujo";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../utils/confirmationModal";

const BackButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="p-1 rounded-full text-gray-700 hover:bg-slate-300 hover:text-gray-800"
    >
        <IoArrowBackOutline size={24} className="cursor-pointer" />
    </button>
);

const FlujosList = memo(() => {
    const { state: { flujos }, actions } = useManagerContext();
    const [selected, setSelected] = useState(null);

    const handleOpenDetailsFor = (id) => {
        setSelected(id);
    };

    const handleOnDeleteFlujo = (id) => {
        FlujoService.deleteFlujo(id)
            .then(() => {
                actions.removeFlujo(id);
                toast.success('Deleted successfully', { duration: 1100 });
            })
            .catch(err => {
                console.log(err);
                toast.error('Could not delete the flujo, please try again', { duration: 1200 });
            })
    }

    const handleCloseDetailView = React.useCallback(() => {
        setSelected(null);
    }, []);

    const renderFlujoCards = React.useMemo(() => () => (
        <div className="grid grid-flow-row grid-cols-1 x:grid-cols-2 gap-3">
            {flujos.map((f) => (
                <FlujoCard
                    key={f.id}
                    onClickOpenDetails={() => handleOpenDetailsFor(f.id)}
                    onDelete={() => handleOnDeleteFlujo(f.id)}
                    data={f}
                />
            ))}
        </div>
    ), [flujos, handleCloseDetailView]);

    if (flujos.length < 1) return <EmtyList />;

    return (
        <div className="flex flex-col overflow-hidden min-w-full w-full">
            <div className="flex items-center">
                {selected && <BackButton onClick={handleCloseDetailView} />}
                <div className="text-gray-700 text-wix font-semibold text-xl ml-1">
                    {selected ? "Detail view" : "Flujos list"}
                </div>
            </div>
            <div className="overflow-scroll whitespace-nowrap no-scrollbar mt-3">
                {selected ? <FlujoDetailsView flujoId={selected} onCloseClick={handleCloseDetailView} /> : renderFlujoCards()}
                <div className="md:py-3"></div>
            </div>
        </div>
    );
});

export default FlujosList;
