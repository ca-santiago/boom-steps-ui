
const Card = ({ children }) => {
    return (
        <div className="w-full shadow-sm rounded-md border bg-white p-3">
            {children}
        </div>
    );
}

export default Card;