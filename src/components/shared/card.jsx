
const Card = ({ children }) => {
    return (
        <div className="w-full grid grid-flow-row gap-3 shadow-sm rounded-md border bg-white p-3">
            {children}
        </div>
    );
}

export default Card;