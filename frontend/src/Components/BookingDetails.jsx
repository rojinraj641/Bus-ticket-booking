import { useSelector } from "react-redux";
import { FaBusAlt, FaRupeeSign, FaUserAlt, FaClock } from "react-icons/fa";
import { useEffect, useState} from 'react';

const BookingDetails = () => {
  const selectedBus = useSelector((state) => state.selectedBus);
  const boarding = useSelector((state) => state.search.boarding);
  const destination = useSelector((state) => state.search.destination);
  const passengers = useSelector((state) => state.passengers);
  const cancellation = useSelector((state) => state.cancellation);
  const totalFare = useSelector((state)=> state.totalPrice);
  const [cancellationPrice, setCancellationPrice] = useState(null);
  const [basePrice, setBasePrice] = useState(totalFare);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);
  const coupons = useSelector((state)=>state.selectedCoupons);

  useEffect(()=>{
    if(coupons){
      console.log(coupons)
      setIsCouponAvailable(true);
    }
  },[coupons])

  useEffect(()=>{
    if(cancellation==true){
      setBasePrice(totalFare);
      setCancellationPrice(100);
    }

  },[cancellation])

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full space-y-8">
      {/* Bus Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start border-b pb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaBusAlt className="text-blue-600" />
            {selectedBus.busName}
          </h3>
          <p className="text-sm text-gray-500">{selectedBus.busType}</p>
        </div>
        <div className="text-sm text-gray-600 text-right space-y-1">
          <div><span className="font-medium">From:</span> {boarding}</div>
          <div><span className="font-medium">To:</span> {destination}</div>
        </div>
      </div>

      {/* Boarding and Dropping Points */}
      <div className="border-b pb-6">
        <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
          <span>Boarding Point</span>
          <span>Dropping Point</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="flex-1 h-0.5 bg-blue-600"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <div className='flex flex-col'>
            <span>{boarding}</span>
            <span>{selectedBus.boardingTime}</span>
          </div>
          <div className="flex flex-col">
            <span>{destination}</span>
            <span>{selectedBus.droppingTime}</span>
          </div>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="border-b pb-6">
        <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-2">
          <FaUserAlt className="text-blue-500" />
          Passenger
        </h4>
        {
          passengers.map((p, index) => {
            return <div key={index} className="flex flex-row text-sm text-gray-600">
              <div className='flex flex-col'>
                <p>{p.name}</p>
                <p>{p.gender}</p>
              </div>
            </div>
          })
        }
      </div>

      {/* Fare Info */}
      <div>
        <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 mb-3">
          <FaRupeeSign className="text-green-600" />
          Fare Details
        </h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>₹{basePrice}</span>
          </div>
          {cancellation && 
          <div className="flex justify-between">
            <span>Cancellation Fee</span>
            <span>₹{cancellationPrice}</span>
          </div>}
          {isCouponAvailable &&
          <div className="flex justify-between text-green-600">
            <span>Coupon Applied</span>
            <span>-₹ {coupons[0]?.discountAmount}</span>
          </div>
          }
          <div className="flex justify-between font-bold border-t pt-3 mt-2 text-gray-800">
            <span>Total</span>
            <span>₹{(totalFare) + (cancellationPrice || 0) - (coupons[0]?.discountAmount || 0)}</span>
          </div>
        </div>

        {isCouponAvailable &&
        <div className="bg-green-100 text-green-700 font-medium rounded-md p-3 text-center mt-5 text-sm shadow-inner">
          You have saved ₹{coupons[0]?.discountAmount} on this booking 🎉
        </div>}
      </div>
    </div>
  );
};

export default BookingDetails;
