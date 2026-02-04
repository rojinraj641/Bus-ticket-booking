import { useSelector } from 'react-redux';
import SeaterSeat from './SeaterSeat';
import SleeperSeats from './SleeperSeats';
import HybridSeats from './HybridSeats';
import PriceBreakout from './PriceBreakout';

const SeatSelection = () => {
  const { busList } = useSelector((state) => state.bus);
  const { seatIds } = useSelector((state) => state.selectedSeats);
  console.log('Seatid in seatselection component: ', seatIds)

  return (
    <div className="w-full px-4 py-8 md:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl text-left font-bold text-gray-800 mb-6">Select Your Seats</h2>
      <div className='flex flex-row justify-between'>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Seat Layout Section */}
          {busList[0].busType === 'Seater' && (
            <SeaterSeat />
          )}
          {busList[0].busType === 'Sleeper' && (
            <SleeperSeats />
          )}
          {busList[0].busType === 'Hybrid' && (
            <HybridSeats />
          )
          }
        </div>
        <div className='mt-6'>
          {seatIds.length > 0 &&
            <PriceBreakout />
          }
        </div>
      </div>
    </div>
  );
};
export default SeatSelection;