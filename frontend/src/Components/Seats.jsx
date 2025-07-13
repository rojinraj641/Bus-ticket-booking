const Seat = ({
  type,
  status,        // true if booked
  selected,      // true if selected by user
  seatNumber,
  onClick,
  bookedBy       // you forgot this earlier
}) => {
  const isSleeper = type === 'Sleeper';

  const baseStyle = isSleeper ? 'w-20 h-10' : 'w-10 h-10';
  const bgColor = status
    ? 'bg-gray-300 text-white cursor-not-allowed'
    : selected
    ? 'bg-green-500 text-white'
    : 'bg-blue-100 hover:bg-blue-300';

  return (
    <div
      onClick={!status ? onClick : undefined}
      className={`rounded-md flex items-center justify-center 
        ${baseStyle} 
        ${bgColor}
        border border-gray-400 shadow-sm transition-all duration-200 cursor-pointer text-sm font-medium`}
      title={status ? `Booked by ${bookedBy || 'someone'}` : `Seat ${seatNumber}`}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
