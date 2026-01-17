import { addSelectedSeats, removeSelectedSeats } from '../Features/Seats/seatSlice';
import Seat from './Seats';
import PriceBreakout from './PriceBreakout';
import { useDispatch, useSelector } from 'react-redux';
import SeaterSeat from './SeaterSeat';

const SeatSelection = ({ seats, selectedBusId }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);
  const { busList } = useSelector((state) => state.bus);

  return (
    <div className="w-full px-4 py-8 md:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl text-left font-bold text-gray-800 mb-6">Select Your Seats</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Seat Layout Section */}
        {busList[0].busType === 'Seater' && (
          <SeaterSeat seats={seats} totalSeats={busList[0].totalseats} deck={busList[0].totalDeck} />
        )}
        {/* Price Section */}
        {selectedSeats.length > 0 && (
          <div className="w-full lg:w-80 sticky top-20">
            <PriceBreakout seats={seats} selectedBusId={selectedBusId} />
          </div>
        )}
      </div>
    </div>
  );
};
export default SeatSelection;