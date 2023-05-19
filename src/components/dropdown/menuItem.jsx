

const MenuItem = ({ onClick, text = "", children }) => {
    return (
        <div onClick={onClick} className="pl-2 pr-3 py-1 hover:bg-slate-100">
            <p className="text-sm text-montserrat font-semibold text-gray-500">{children || text}</p>
        </div>
    );
}

export default MenuItem;