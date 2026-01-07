import React from 'react';

const Seat = React.memo(({ type, status, selected, seatNumber, onClick, bookedBy }) => {
  const isSleeper = type === 'Sleeper';
  const baseStyle = isSleeper ? 'w-20 h-10' : 'w-10 h-10';

  let bgColor;
  if (status === 'Locked') {
    bgColor = 'bg-gray-500 text-black';
  } else if (bookedBy === 'Male') {
    bgColor = 'bg-red-500 text-white';
  } else if (bookedBy === 'Female') {
    bgColor = 'bg-blue-500 text-white';
  } else if (selected) {
    bgColor = 'bg-green-500 text-white';
  } else {
    bgColor = 'bg-gray-300 hover:bg-blue-300';
  }

  const isDisabled = bookedBy != null || status === 'Locked';

  return (
    <div
      onClick={isDisabled ? undefined : onClick}
      className={`relative rounded-md flex items-center justify-center
        ${baseStyle}
        ${bgColor}
        border border-gray-400 shadow-sm transition-all duration-200 text-sm font-medium
        ${isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
    >
      {seatNumber}
    </div>
  );
});

export default Seat;
