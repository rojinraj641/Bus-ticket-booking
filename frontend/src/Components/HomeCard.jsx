const HomeCard = ({title}) => {
    return (
        <div className="w-64 sm:w-72 md:w-80 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 shadow-lg rounded-lg overflow-hidden">
            <div className="h-48 sm:h-56 w-full object-cover object-center"/>
            <div className="bg-sky-800 p-3 text-white">
                <p className="font-bold text-sm sm:text-base">Buses From</p>
                <p className="text-sm sm:text-base">{title}</p>
            </div>
        </div>
    );
}

export default HomeCard;
