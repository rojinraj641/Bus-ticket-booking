import React from 'react';

function CouponCard({ coupon, onApply, isActive }) {
  return (
    <div 
      className={`border rounded-lg p-4 text-center cursor-pointer transition duration-200 transform hover:-translate-y-1 hover:shadow-md
        ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
      onClick={() => onApply(coupon)}
    >
      <div className="font-semibold text-sm mb-2">{coupon.value}</div>
      <div className="bg-gray-100 inline-block px-2 py-1 rounded-md text-xs mb-2">{coupon.code}</div>
      <button className="w-full bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-3 rounded-md transition duration-150">
        Apply
      </button>
    </div>
  );
}

export default CouponCard;