// components/CouponSection.jsx
import React, { useState } from 'react';
import CouponCard from './CouponCard';

function CouponSection({ coupons, onApplyCoupon, appliedCoupon }) {
  const [couponCode, setCouponCode] = useState('');

  const handleInputChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleManualApply = () => {
    if (!couponCode) {
      alert('Please enter a coupon code');
      return;
    }
    
    const matchedCoupon = coupons.find(coupon => coupon.code === couponCode);
    if (matchedCoupon) {
      onApplyCoupon(matchedCoupon);
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Have a coupon code?</h3>
      <div className="flex mb-6">
        <input 
          type="text" 
          placeholder="Enter Coupon Code" 
          value={couponCode}
          onChange={handleInputChange}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={handleManualApply}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition duration-150"
        >
          Apply
        </button>
      </div>
      
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Apply Coupons</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <CouponCard 
            key={coupon.id} 
            coupon={coupon} 
            onApply={() => {
              setCouponCode(coupon.code);
              onApplyCoupon(coupon);
            }} 
            isActive={appliedCoupon && appliedCoupon.id === coupon.id}
          />
        ))}
      </div>
    </div>
  );
}

export default CouponSection;
