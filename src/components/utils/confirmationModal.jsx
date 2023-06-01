

const ConfirmationModal = ({
    isOpen,
    onConfirm,
    onClose,
    messageComponent,
    isDangerOperation
}) => {

    if(!isOpen) return null;

    return (
        <div className="fixed flex w-full h-screen top-0 left-0 items-center justify-center bg-opacity-30 bg-slate-800 z-50">
            <div className="p-3 bg-white rounded-lg shadow flex gap-3 flex-col max-w-xs">
                <div className="flex items-center justify-center whitespace-break-spaces">
                    <div>{messageComponent}</div>
                </div>
                <div className="flex gap-4 font-semibold text-white mx-auto">
                    <button className="p-2 rounded-md bg-red-500" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="p-2 rounded-md bg-gray-500" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
