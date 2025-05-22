import { Coupon } from "../models/coupon.models.js";

async function addCoupon() {
    try {
        const newCoupon = new Coupon({
            couponId: 'COUP001',
            couponCode: 'WEL100',
            description: 'Rs 100 off for first booking',
            offerStarts: Date.now(),
            offerEnds: new Date('2025,4,20'),
            discountAmount: 100
        })
        const existingOffer = await Coupon.findOne({ couponCode: newCoupon.couponCode });
        if (existingOffer) {
            console.log('Offer already existed');
        }
        else {
            await newCoupon.save();
            console.log('Coupon added succcessfully');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export default addCoupon
