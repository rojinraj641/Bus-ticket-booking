import { useState } from 'react';
import CouponCard from './CouponCard';
import { useDispatch } from 'react-redux';
import { addCoupons, resetCoupons } from '../Features/Coupons/couponSlice';
import { Toaster, toast} from 'sonner';

const CouponSection = ({ coupons, onApplyCoupon, appliedCoupon }) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [availableCoupon, setAvailableCoupon] = useState('');
  const dispatch = useDispatch();

  const handleApplyCoupons = (e)=>{
    setAvailableCoupon(e.target.value)
  }
  const handleManualApply = ()=>{
    if(!availableCoupon){
      toast.error('Please enter a coupon code');
      return;
    }
    const matchedCoupon = coupons.find((coupon)=>coupon.couponCode === availableCoupon);
    if(matchedCoupon){
      dispatch(resetCoupons());
      dispatch(addCoupons(matchedCoupon));
      toast.success('Coupon added successfully');
    }
    else{
      toast.error('Invalid coupon code')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full max-w-3xl">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Have a coupon code?</h3>
      <Toaster richColors/>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-4">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={availableCoupon}
          onChange={handleApplyCoupons}
          className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none transition duration-200 shadow-sm"
        />
        <button
          onClick={handleManualApply}
          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none transition duration-200 shadow-sm"
        >
          Apply
        </button>
      </div>

      <p
        className="cursor-pointer text-xs sm:text-sm font-semibold text-blue-500 mb-4"
        onClick={() => setShowCoupon(prev => !prev)}
      >
        {showCoupon ? "Hide Coupons" : "Show Available Coupons"}
      </p>

      {showCoupon && (
        <>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Apply Coupons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onApply={() => {
                  setAvailableCoupon(coupon.couponCode);
                  onApplyCoupon(coupon);
                }}
                isActive={appliedCoupon && appliedCoupon.id === coupon.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CouponSection;
