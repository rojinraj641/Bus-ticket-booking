import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");

import connectDB from "./config/db.js";
import addBuses from "./test/bus.js";
import addUser from "./test/user.js";
import addCoupon from "./test/coupon.js";
import addTransaction from "./test/transaction.js";
import addSeats from "./test/seats.js";
import addPassenger from "./test/passenger.js";
import addBooking from "./test/booking.js";
import addOperator from "./test/operator.js";
import addRoutes from "./test/routes.js";
import addTrips from "./test/trips.js";

await connectDB();

// await addBuses();
// await addUser();
// await addCoupon();
// await addPassenger();
// await addTransaction();
// await addBooking();
// await addSeats();
// await addOperator();
// await addRoutes();
// await addTrips();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});