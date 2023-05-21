const imgLink = 'https://img.freepik.com/premium-vector/bug-report-isolated-cartoon-vector-illustrations_107173-30306.jpg?w=1000';

const EmtyList = () => {
    return (
        <div>
            <div className="rounded-md bg-white shadow-sm p-3 text-center items-center flex flex-col max-h-full">
                <p className='text-montserrat font-semibold text-lg text-gray-500'>Let's start by creating a flujo</p>
                <img className="md:max-w-3xl w-fit object-cover" src={imgLink} />
            </div>
        </div>
    );
}

export default EmtyList;