import { Coupon } from "../models/coupon.models.js";

const newCoupon = {
  couponCode: 'WEL100',
  description: 'Rs 100 off on first booking',
  offerStarts: new Date(),
  offerEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  discountAmount: 100 
};

async function addCoupon() {
  try {
    const count = await Coupon.countDocuments();
    if (count < 1) {
      const result = await Coupon.create(newCoupon);
      console.log("✅ Coupon inserted:", result);
    } else {
      console.log("⚠️ Coupon already exists, skipping insert.");
    }
  } catch (error) {
    console.error(`❌ Failed to add new coupon: ${error.message}`);
  }
}

export default addCoupon;
