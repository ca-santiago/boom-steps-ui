import FlujoCard from "./card";

export default function FlujosList({ data }) {
    if (data.length < 1) return (
        <div className="rounded-md border shadow p-3 text-center">
            <p className='text-montserrat font-semibold text-lg text-gray-500'>Let's start by creating a flujo</p>
        </div>
    );

    return (
        <div className="p-3 grid gap-2 md:max-h-screen overflow-scroll whitespace-nowrap no-scrollbar">
            {data.map((f) => (
                <div key={f.id} className="">
                    <FlujoCard {...f} />
                </div>
            ))}
        </div>
    );
}
