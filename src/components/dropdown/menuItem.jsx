

const MenuItem = ({ onClick, text = "", children }) => {
    return (
        <div onClick={onClick} className="pl-2 pr-3 py-1 hover:bg-slate-100">
            <p className="text-base font-semibold text-gray-600">{children || text}</p>
        </div>
    );
}

export default MenuItem;