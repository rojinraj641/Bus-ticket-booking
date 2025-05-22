import React from 'react';

function BookingDetails({ busDetails, journey, passenger, fare }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Bus Details */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{busDetails.name}</h3>
          <div className="text-sm text-gray-500">{busDetails.type}</div>
        </div>
      </div>

      {/* Journey Times */}
      <div className="flex flex-col sm:flex-row justify-between text-center mb-6 pb-6 border-b border-gray-200">
        <div className="mb-4 sm:mb-0">
          <div className="text-sm text-gray-600">Departure</div>
          <div className="text-xl font-semibold">{journey.departure.time}</div>
          <div className="text-sm text-gray-500">{journey.departure.date}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Arrival</div>
          <div className="text-xl font-semibold">{journey.arrival.time}</div>
          <div className="text-sm text-gray-500">{journey.arrival.date}</div>
        </div>
      </div>

      {/* Boarding & Dropping */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="font-medium">Boarding Point</span>
          <span className="font-medium">Dropping Point</span>
        </div>

        {/* Journey Progress Line */}
        <div className="flex items-center my-4">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <div className="flex-1 h-0.5 bg-blue-600"></div>
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>{journey.departure.location}</span>
          <span>{journey.arrival.location}</span>
        </div>
      </div>

      {/* Passenger Info */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-base font-semibold mb-2">Passenger</h4>
        <div className="text-sm">{passenger.name} {passenger.details}</div>
      </div>

      {/* Fare Details */}
      <div>
        <h4 className="text-base font-semibold mb-3">Fare Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>₹{fare.baseFare}</span>
          </div>
          <div className="flex justify-between">
            <span>Cancellation Fee</span>
            <span>₹{fare.cancellationFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Applied</span>
            <span>-₹{fare.couponDiscount}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 mt-2 border-t border-gray-200">
            <span>Total</span>
            <span>₹{fare.total}</span>
          </div>
        </div>

        <div className="bg-green-50 text-green-600 font-medium rounded-lg p-3 text-center mt-4 text-sm">
          You have saved ₹{fare.couponDiscount} on this booking
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
