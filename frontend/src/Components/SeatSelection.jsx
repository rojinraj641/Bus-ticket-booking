import { addSelectedSeats, removeSelectedSeats } from '../Features/Seats/seatSlice';
import Seat from './Seats';
import PriceBreakout from './PriceBreakout';
import { useDispatch, useSelector } from 'react-redux';

const SeatSelection = ({ seats, selectedBusId }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seat.selectedSeats);

  const ascendingOrder = (a, b) => {
    const numA = parseInt(a.seatNumber.slice(1));
    const numB = parseInt(b.seatNumber.slice(1));
    return numA - numB;
  };

  const getSortedSeats = (deckSeats, prefix) =>
    deckSeats.filter(seat => seat.seatNumber.startsWith(prefix)).sort(ascendingOrder);

  const lowerDeckSeats = seats.filter(seat => seat.seatPosition === 'Lower');
  const lowerDeck = {
    W: getSortedSeats(lowerDeckSeats, 'LA'),
    M: getSortedSeats(lowerDeckSeats, 'LB'),
    A: getSortedSeats(lowerDeckSeats, 'LC'),
    SW: getSortedSeats(lowerDeckSeats, 'LD')
  };

  const upperDeckSeats = seats.filter(seat => seat.seatPosition === 'Upper');
  const upperDeck = {
    W: getSortedSeats(upperDeckSeats, 'UA'),
    M: getSortedSeats(upperDeckSeats, 'UB'),
    A: getSortedSeats(upperDeckSeats, 'UC'),
    SW: getSortedSeats(upperDeckSeats, 'UD')
  };

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      dispatch(removeSelectedSeats(seatNumber));
    } else {
      dispatch(addSelectedSeats(seatNumber));
    }
  };

  const renderDeck = (deck) => (
    <div className="grid grid-cols-5 gap-3">
      {deck.map((seat, index) => (
        <Seat
          key={seat.seatNumber} // use stable key
          type={seat.seatType}
          status={seat.status}
          bookedBy={seat.bookedBy}
          seatNumber={seat.seatNumber}
          selected={selectedSeats.includes(seat.seatNumber)}
          onClick={() => handleSeatClick(seat.seatNumber)}
        />
      ))}
    </div>
  );

  const renderDriverSeat = () => (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-md text-xs font-semibold">
        Driver
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 py-8 md:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Seats</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Seat Layout Section */}
        <div className="flex-1 space-y-8">
          {/* Lower Deck */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Lower Deck</h3>
            <div className="flex flex-row bg-white rounded-xl p-5 shadow-md">
              <div className="pl-4">
                {renderDriverSeat()}
              </div>
              <div className="pl-20 space-y-6">
                {renderDeck(lowerDeck.W)}
                {renderDeck(lowerDeck.M)}
                {renderDeck(lowerDeck.A)}
                {renderDeck(lowerDeck.SW)}
              </div>
            </div>
          </div>

          {/* Upper Deck */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Upper Deck</h3>
            <div className="bg-white rounded-xl pl-40 p-6 shadow-md space-y-6">
              {renderDeck(upperDeck.W)}
              {renderDeck(upperDeck.M)}
              {renderDeck(upperDeck.A)}
              {renderDeck(upperDeck.SW)}
            </div>
          </div>
        </div>

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