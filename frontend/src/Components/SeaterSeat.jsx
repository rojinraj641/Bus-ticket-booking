import { MdEventSeat } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { toggleSeatSelection } from "../Features/Seats/selectedSeatsSlice";

const SeaterSeat = () => {
  const { seats } = useSelector((state) => state.seats);
  const { busId } = useSelector((state) => state.busId);
  const { seatIds } = useSelector((state) => state.selectedSeats);
  const dispatch = useDispatch();

  const availableSeats = seats.filter((s) => s.busId === busId);

  const toggleSeat = (seatId) => {
    dispatch(toggleSeatSelection({ busId, seatId }));
  };

  const renderSeat = (seat) => {
    const isSelected = seatIds.includes(seat._id);

    return (
      <button
        key={seat._id}
        onClick={() => toggleSeat(seat._id)}
        className="flex justify-center items-center"
      >
        <MdEventSeat
          size={22}
          className="md:w-[30px] md:h-[30px]"
          style={{ color: isSelected ? "#16A34A" : "#9CA3AF" }}
        />
      </button>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Lower Deck */}
      <div className="w-full md:w-auto">
        <p className="font-semibold mb-2 text-sm md:text-base">
          Lower Deck
        </p>

        {/* Seat Container */}
        <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-3 overflow-x-auto">
          {/* Driver */}
          <div className="flex justify-end pr-2 md:pr-6 py-2 md:py-6">
            <GiSteeringWheel size={20} />
          </div>

          {/* Seats Grid */}
          <div
            className="
              grid
              grid-cols-[repeat(2,1fr)_32px_repeat(2,1fr)]
              md:grid-cols-[auto_auto_40px_auto_auto]
              gap-2 md:gap-3
            "
          >
            {availableSeats.map((seat, index) => (
              <div key={seat._id}>
                {index % 4 === 2 && <div />}
                {renderSeat(seat)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeaterSeat;

