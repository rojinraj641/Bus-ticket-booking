import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SeatSelection = ()=> {
  const [selectedSeat, setSelectedSeat] = useState('L4');
  
  const renderSeat = (status, id) => {
    let bgColor = "bg-white"; // Available
    
    if (status === "female") {
      bgColor = "bg-blue-500";
    } else if (status === "male") {
      bgColor = "bg-red-500";
    } else if (status === "selected") {
      bgColor = "bg-green-600";
    }
    
    return (
      <div 
        className={`w-24 h-8 border border-gray-400 rounded-sm ${bgColor} mx-1 my-1`}
        onClick={() => status === "available" && setSelectedSeat(id)}
      />
    );
  };

  return (
    <div className="flex bg-gray-100 flex-col md:flex-row pl-20 mx-auto p-4 gap-4">
      {/* Left side - Bus Layout */}
      <div className="flex-1">
        {/* Lower Deck */}
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-2">Lower Deck</h2>
          <div className="border border-gray-400 p-2">
            <div className="flex items-center">
              <div className="w-12 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                  <line x1="9.17" y1="14.83" x2="4.93" y2="19.07" />
                </svg>
              </div>
              <div className="flex flex-row pl-16">
                {renderSeat("female")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              </div>
            </div>
            <div className="flex mb-5 pl-28">
              {renderSeat("available")}
              {renderSeat("male")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
            </div>
            <div className="flex pl-28">
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("selected", "L4")}
              {renderSeat("available")}
            </div>
          </div>
        </div>
        
        {/* Upper Deck */}
        <div>
          <h2 className="text-sm font-medium mb-2">Upper Deck</h2>
          <div className="border border-gray-400 p-2">
            <div className="flex ml-27">
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
            </div>
            <div className="flex ml-27 mb-5">
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
            </div>
            <div className="flex ml-27">
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
              {renderSeat("available")}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Booking Details */}
      <div className="flex-1">
        <div className="border border-gray-400 rounded-lg p-4">
          {/* Legend */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-6 h-4 bg-blue-500 mr-2"></div>
              <span className="text-sm">Female</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-white border border-gray-300 mr-2"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-red-500 mr-2"></div>
              <span className="text-sm">Male</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-4 bg-green-600 mr-2"></div>
              <span className="text-sm">Selected</span>
            </div>
          </div>
          
          {/* Journey Details */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="text-sm">Boarding Point:</label>
                <div className="flex items-center border border-gray-400 rounded px-3 py-2 w-48">
                  <span className="flex-1"></span>
                  <ChevronDown size={16} />
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">21:30</div>
                <div className="text-xs text-gray-500">March 21</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="text-sm">Dropping Point:</label>
                <div className="flex items-center border border-gray-400 rounded px-3 py-2 w-48">
                  <span className="flex-1"></span>
                  <ChevronDown size={16} />
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">07:30</div>
                <div className="text-xs text-gray-500">March 22</div>
              </div>
            </div>
          </div>
          
          <hr className="my-4 border-gray-200" />
          
          {/* Seat and Fare Details */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <div className="text-sm">Seat No.</div>
              <div className="font-medium">{selectedSeat}</div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium">Fare Details</div>
              <div className="flex justify-between mt-1">
                <div className="text-sm">Base Price</div>
                <div className="font-medium">1120</div>
              </div>
            </div>
          </div>
          
          {/* Payment Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-center">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
export default SeatSelection