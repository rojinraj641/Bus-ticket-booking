import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../config/constants.js";
import { Operator } from "../models/operator.models.js";
import { Bus } from "../models/bus.models.js";
import { Route } from "../models/route.models.js";
import { Trip } from "../models/trip.models.js";
import { Seats } from "../models/seats.models.js";
import { User } from "../models/user.models.js";
import { Passenger } from "../models/passenger.models.js";
import { Coupon } from "../models/coupon.models.js";
import { Transaction } from "../models/transaction.models.js";
import { Booking } from "../models/booking.models.js";

dotenv.config({ path: "./.env" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const seedData = async () => {
  const dbUri = `${process.env.MONGO_URI}/${DB_NAME}`;
  await mongoose.connect(dbUri);
  console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const collection of collections) {
    await mongoose.connection.db.collection(collection.name).drop();
  }
  console.log("Dropped all existing collections so indexes and dummy records are fully reset");

  const operators = await Operator.insertMany([
    {
      name: "Orange Travels",
      contactEmail: "contact@orangetravels.com",
      contactPhone: "9876543210",
      gstNumber: "29ABCDE1234F1Z5",
      averageRating: 4.7,
      ratingCount: 4821,
      status: "ACTIVE",
    },
    {
      name: "VRL Travels",
      contactEmail: "support@vrltravels.com",
      contactPhone: "9876543211",
      gstNumber: "29BCDEF2345G1Z6",
      averageRating: 4.5,
      ratingCount: 3960,
      status: "ACTIVE",
    },
    {
      name: "SRS Travels",
      contactEmail: "info@srstravels.com",
      contactPhone: "9876543212",
      gstNumber: "29CDEFG3456H1Z7",
      averageRating: 4.3,
      ratingCount: 2847,
      status: "ACTIVE",
    },
    {
      name: "Purple Star Bus",
      contactEmail: "booking@purplestarbus.com",
      contactPhone: "9876543213",
      gstNumber: "32DEFGH4567J1Z8",
      averageRating: 4.6,
      ratingCount: 3210,
      status: "ACTIVE",
    },
  ]);

  const buses = await Bus.insertMany([
    {
      operator: operators[0]._id,
      busName: "Orange Travels Volvo",
      busNumber: "TS09AB1001",
      busType: ["AC Sleeper"],
      averageRating: 4.7,
      ratingCount: 342,
      totalSeats: 36,
      totalDeck: 1,
      amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"],
      images: ["orange1.jpg", "orange2.jpg"],
      status: "ACTIVE",
    },
    {
      operator: operators[1]._id,
      busName: "VRL Express",
      busNumber: "KA01CD2002",
      busType: ["AC Seater"],
      averageRating: 4.2,
      ratingCount: 198,
      totalSeats: 45,
      totalDeck: 1,
      amenities: ["Charging Point", "CCTV"],
      images: ["vrl1.jpg"],
      status: "ACTIVE",
    },
    {
      operator: operators[2]._id,
      busName: "SRS Royal",
      busNumber: "KA03EF3003",
      busType: ["Non AC Seater"],
      averageRating: 4.0,
      ratingCount: 156,
      totalSeats: 49,
      totalDeck: 1,
      amenities: ["Water Bottle"],
      images: ["srs1.jpg"],
      status: "ACTIVE",
    },
    {
      operator: operators[3]._id,
      busName: "Purple Star Deluxe",
      busNumber: "KL07GH4004",
      busType: ["AC Sleeper"],
      averageRating: 4.5,
      ratingCount: 281,
      totalSeats: 40,
      totalDeck: 1,
      amenities: ["WiFi", "Charging Point", "Reading Light"],
      images: ["purple1.jpg"],
      status: "ACTIVE",
    },
    {
      operator: operators[0]._id,
      busName: "Orange City Link",
      busNumber: "TN10JK5005",
      busType: ["AC Semi Sleeper"],
      averageRating: 4.3,
      ratingCount: 214,
      totalSeats: 42,
      totalDeck: 1,
      amenities: ["Charging Point", "Water Bottle"],
      images: ["orange-city.jpg"],
      status: "ACTIVE",
    },
  ]);

  const routes = await Route.insertMany([
    {
      operator: operators[0]._id,
      sourceCity: "Bengaluru",
      destinationCity: "Hyderabad",
      totalDistanceKm: 570,
      totalDurationMinutes: 480,
      operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      stoppingPoints: [
        { order: 1, city: "Bengaluru", offsetFromStartMinutes: 0, distanceFromStartKm: 0, isBoardingPoint: true, isDroppingPoint: false, landmark: "Majestic" },
        { order: 2, city: "Anantapur", offsetFromStartMinutes: 180, distanceFromStartKm: 210, isBoardingPoint: true, isDroppingPoint: false, landmark: "Bus Stand" },
        { order: 3, city: "Hyderabad", offsetFromStartMinutes: 480, distanceFromStartKm: 570, isBoardingPoint: false, isDroppingPoint: true, landmark: "Madhapur" },
      ],
      status: "ACTIVE",
    },
    {
      operator: operators[1]._id,
      sourceCity: "Chennai",
      destinationCity: "Bengaluru",
      totalDistanceKm: 355,
      totalDurationMinutes: 350,
      operatingDays: ["Monday", "Wednesday", "Friday", "Sunday"],
      stoppingPoints: [
        { order: 1, city: "Chennai", offsetFromStartMinutes: 0, distanceFromStartKm: 0, isBoardingPoint: true, isDroppingPoint: false, landmark: "Koyambedu" },
        { order: 2, city: "Vellore", offsetFromStartMinutes: 120, distanceFromStartKm: 140, isBoardingPoint: true, isDroppingPoint: false, landmark: "Town Hall" },
        { order: 3, city: "Bengaluru", offsetFromStartMinutes: 350, distanceFromStartKm: 355, isBoardingPoint: false, isDroppingPoint: true, landmark: "Kempegowda" },
      ],
      status: "ACTIVE",
    },
    {
      operator: operators[2]._id,
      sourceCity: "Hyderabad",
      destinationCity: "Vijayawada",
      totalDistanceKm: 290,
      totalDurationMinutes: 310,
      operatingDays: ["Monday", "Wednesday", "Friday", "Saturday"],
      stoppingPoints: [
        { order: 1, city: "Hyderabad", offsetFromStartMinutes: 0, distanceFromStartKm: 0, isBoardingPoint: true, isDroppingPoint: false, landmark: "RTC X Roads" },
        { order: 2, city: "Warangal", offsetFromStartMinutes: 120, distanceFromStartKm: 140, isBoardingPoint: true, isDroppingPoint: false, landmark: "Bus Station" },
        { order: 3, city: "Vijayawada", offsetFromStartMinutes: 310, distanceFromStartKm: 290, isBoardingPoint: false, isDroppingPoint: true, landmark: "Ring Road" },
      ],
      status: "ACTIVE",
    },
    {
      operator: operators[3]._id,
      sourceCity: "Bengaluru",
      destinationCity: "Coimbatore",
      totalDistanceKm: 220,
      totalDurationMinutes: 240,
      operatingDays: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      stoppingPoints: [
        { order: 1, city: "Bengaluru", offsetFromStartMinutes: 0, distanceFromStartKm: 0, isBoardingPoint: true, isDroppingPoint: false, landmark: "Electronic City" },
        { order: 2, city: "Salem", offsetFromStartMinutes: 120, distanceFromStartKm: 110, isBoardingPoint: true, isDroppingPoint: false, landmark: "Bus Stand" },
        { order: 3, city: "Coimbatore", offsetFromStartMinutes: 240, distanceFromStartKm: 220, isBoardingPoint: false, isDroppingPoint: true, landmark: "Ukkadam" },
      ],
      status: "ACTIVE",
    },
    {
      operator: operators[0]._id,
      sourceCity: "Hyderabad",
      destinationCity: "Bengaluru",
      totalDistanceKm: 590,
      totalDurationMinutes: 500,
      operatingDays: ["Tuesday", "Thursday", "Friday", "Sunday"],
      stoppingPoints: [
        { order: 1, city: "Hyderabad", offsetFromStartMinutes: 0, distanceFromStartKm: 0, isBoardingPoint: true, isDroppingPoint: false, landmark: "Gachibowli" },
        { order: 2, city: "Kurnool", offsetFromStartMinutes: 180, distanceFromStartKm: 210, isBoardingPoint: true, isDroppingPoint: false, landmark: "Depot" },
        { order: 3, city: "Bengaluru", offsetFromStartMinutes: 500, distanceFromStartKm: 590, isBoardingPoint: false, isDroppingPoint: true, landmark: "Babusapalya" },
      ],
      status: "ACTIVE",
    },
  ]);

  const today = new Date();
  const tripRecords = [];
  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getNextDateForDay = (dayName, baseDate) => {
    const targetDayIndex = weekdayNames.indexOf(dayName);
    const todayIndex = baseDate.getDay();
    const diff = (targetDayIndex - todayIndex + 7) % 7;
    const nextDate = new Date(baseDate);
    nextDate.setDate(baseDate.getDate() + diff);
    return nextDate;
  };

  const tripTemplates = [
    { routeIndex: 0, busIndex: 0, dayName: "Wednesday", departureHour: 21, departureMin: 30, durationMinutes: 480, basePrice: 1099 },
    { routeIndex: 1, busIndex: 1, dayName: "Thursday", departureHour: 19, departureMin: 15, durationMinutes: 350, basePrice: 899 },
    { routeIndex: 2, busIndex: 2, dayName: "Friday", departureHour: 20, departureMin: 45, durationMinutes: 310, basePrice: 759 },
    { routeIndex: 3, busIndex: 3, dayName: "Saturday", departureHour: 22, departureMin: 0, durationMinutes: 240, basePrice: 699 },
    { routeIndex: 4, busIndex: 4, dayName: "Sunday", departureHour: 18, departureMin: 30, durationMinutes: 500, basePrice: 1199 },
    { routeIndex: 0, busIndex: 0, dayName: "Saturday", departureHour: 23, departureMin: 0, durationMinutes: 480, basePrice: 1150 },
  ];

  const tripBookingMeta = tripTemplates.map((template) => {
    const departureDate = getNextDateForDay(template.dayName, today);
    const departureDateTime = new Date(departureDate);
    departureDateTime.setHours(template.departureHour, template.departureMin, 0, 0);

    const route = routes[template.routeIndex];
    const boardingPoint = route.stoppingPoints.find((sp) => sp.isBoardingPoint);
    const droppingPoint = route.stoppingPoints.find((sp) => sp.isDroppingPoint);

    const boardingDateTime = new Date(departureDateTime);
    boardingDateTime.setMinutes(boardingDateTime.getMinutes() + (boardingPoint?.offsetFromStartMinutes || 0));

    const droppingDateTime = new Date(departureDateTime);
    droppingDateTime.setMinutes(droppingDateTime.getMinutes() + (droppingPoint?.offsetFromStartMinutes || 0));

    return { boardingDateTime, droppingDateTime };
  });

  for (const template of tripTemplates) {
    const route = routes[template.routeIndex];
    const bus = buses[template.busIndex];

    tripRecords.push({
      bus: bus._id,
      route: route._id,
      operator: route.operator,
      departureTime: `${String(template.departureHour).padStart(2, "0")}:${String(template.departureMin).padStart(2, "0")}`,
      basePrice: template.basePrice,
      availableSeatsCount: bus.totalSeats,
      status: "SCHEDULED",
    });
  }

  const trips = await Trip.insertMany(tripRecords);

  const seatTemplates = [
    { seatType: "Sleeper", seatPosition: "Lower", deck: 1 },
    { seatType: "Sleeper", seatPosition: "Upper", deck: 1 },
    { seatType: "Seater", seatPosition: "Lower", deck: 1 },
    { seatType: "Seater", seatPosition: "Upper", deck: 1 },
    { seatType: "Semi Sleeper", seatPosition: "Lower", deck: 1 },
  ];

  const seatsToInsert = [];
  for (const trip of trips) {
    const bus = buses.find((entry) => entry._id.toString() === trip.bus.toString());
    const seatCount = bus.totalSeats;
    const seatTypes = bus.busType.some((type) => type.includes("Sleeper")) ? ["Sleeper", "Sleeper", "Seater", "Seater"] : ["Seater", "Seater", "Semi Sleeper"];

    for (let i = 0; i < seatCount; i += 1) {
      const seatType = seatTypes[i % seatTypes.length];
      const seatPosition = seatType === "Sleeper" && i % 2 === 0 ? "Lower" : seatType === "Sleeper" ? "Upper" : "Lower";
      const deck = seatType === "Sleeper" && i % 4 === 0 ? 2 : 1;

      seatsToInsert.push({
        trip: trip._id,
        seatNumber: `${String.fromCharCode(65 + (i % 6))}${String(Math.floor(i / 6) + 1).padStart(2, "0")}`,
        seatType,
        seatPosition,
        deck,
        priceModifier: seatPosition === "Upper" ? -25 : 0,
        status: "Available",
        lockedBy: null,
        lockExpiresAt: null,
        booking: null,
        passenger: null,
        genderRestriction: null,
      });
    }
  }

  await Seats.insertMany(seatsToInsert);

  const users = await User.insertMany([
    { phone: "9000000001", name: "Aman Verma", email: "aman@example.com", passwordHash: "hash_aman", isActive: true, isPhoneVerified: true },
    { phone: "9000000002", name: "Neha Sharma", email: "neha@example.com", passwordHash: "hash_neha", isActive: true, isPhoneVerified: true },
    { phone: "9000000003", name: "Rohit Nair", email: "rohit@example.com", passwordHash: "hash_rohit", isActive: true, isPhoneVerified: true },
    { phone: "9000000004", name: "Pooja Iyer", email: "pooja@example.com", passwordHash: "hash_pooja", isActive: true, isPhoneVerified: true },
  ]);

  const passengers = await Passenger.insertMany([
    { user: users[0]._id, name: "Aman Verma", age: 32, gender: "Male" },
    { user: users[1]._id, name: "Neha Sharma", age: 28, gender: "Female" },
    { user: users[2]._id, name: "Rohit Nair", age: 35, gender: "Male" },
    { user: users[3]._id, name: "Pooja Iyer", age: 29, gender: "Female" },
    { user: users[0]._id, name: "Anita Verma", age: 30, gender: "Female" },
  ]);

  const coupons = await Coupon.insertMany([
    {
      couponCode: "WELCOME10",
      couponImage: "welcome.png",
      description: "10% off for new users",
      discountType: "PERCENTAGE",
      discountValue: 10,
      maxDiscountAmount: 200,
      minOrderAmount: 500,
      usageLimitTotal: 50,
      usageLimitPerUser: 1,
      usedCount: 0,
      offerStarts: new Date("2025-01-01T00:00:00.000Z"),
      offerEnds: new Date("2027-12-31T00:00:00.000Z"),
      isActive: true,
    },
    {
      couponCode: "BUSSAVE20",
      couponImage: "save20.png",
      description: "Flat ₹200 OFF",
      discountType: "FLAT",
      discountValue: 200,
      maxDiscountAmount: 200,
      minOrderAmount: 700,
      usageLimitTotal: 100,
      usageLimitPerUser: 2,
      usedCount: 0,
      offerStarts: new Date("2025-01-01T00:00:00.000Z"),
      offerEnds: new Date("2027-12-31T00:00:00.000Z"),
      isActive: true,
    },
    {
      couponCode: "WEEKEND5",
      couponImage: "weekend.png",
      description: "Weekend 5% cashback",
      discountType: "PERCENTAGE",
      discountValue: 5,
      maxDiscountAmount: 150,
      minOrderAmount: 400,
      usageLimitTotal: 20,
      usageLimitPerUser: 1,
      usedCount: 0,
      offerStarts: new Date("2025-06-01T00:00:00.000Z"),
      offerEnds: new Date("2027-06-30T00:00:00.000Z"),
      isActive: true,
    },
  ]);

  const transactions = await Transaction.insertMany([
    { user: users[0]._id, booking: null, transactionRef: "TXN-1001", gatewayTransactionId: "RZP-1001", type: "PAYMENT", amount: 1099, paymentMethod: "UPI", paymentStatus: "Successful" },
    { user: users[1]._id, booking: null, transactionRef: "TXN-1002", gatewayTransactionId: "RZP-1002", type: "PAYMENT", amount: 899, paymentMethod: "Credit Card", paymentStatus: "Successful" },
    { user: users[2]._id, booking: null, transactionRef: "TXN-1003", gatewayTransactionId: "RZP-1003", type: "PAYMENT", amount: 759, paymentMethod: "Debit Card", paymentStatus: "Successful" },
    { user: users[3]._id, booking: null, transactionRef: "TXN-1004", gatewayTransactionId: "RZP-1004", type: "PAYMENT", amount: 699, paymentMethod: "Wallet", paymentStatus: "Successful" },
  ]);

  const seatDocs = await Seats.find().lean();
  const firstAvailableSeats = seatDocs.slice(0, 4).map((seat) => seat._id);

  const bookings = await Booking.insertMany([
    {
      user: users[0]._id,
      trip: trips[0]._id,
      transaction: transactions[0]._id,
      seats: [firstAvailableSeats[0]],
      passengers: [passengers[0]._id],
      pnr: "RB4X9K2",
      boardingPointCity: "Bengaluru",
      boardingDateTime: tripBookingMeta[0].boardingDateTime,
      droppingPointCity: "Hyderabad",
      droppingDateTime: tripBookingMeta[0].droppingDateTime,
      couponApplied: coupons[0]._id,
      discountAmount: 110,
      totalAmount: 989,
      bookingStatus: "Confirmed",
      cancelledAt: null,
    },
    {
      user: users[1]._id,
      trip: trips[1]._id,
      transaction: transactions[1]._id,
      seats: [firstAvailableSeats[1]],
      passengers: [passengers[1]._id],
      pnr: "RB8N2V4",
      boardingPointCity: "Chennai",
      boardingDateTime: tripBookingMeta[1].boardingDateTime,
      droppingPointCity: "Bengaluru",
      droppingDateTime: tripBookingMeta[1].droppingDateTime,
      couponApplied: coupons[1]._id,
      discountAmount: 200,
      totalAmount: 699,
      bookingStatus: "Confirmed",
      cancelledAt: null,
    },
    {
      user: users[2]._id,
      trip: trips[2]._id,
      transaction: transactions[2]._id,
      seats: [firstAvailableSeats[2]],
      passengers: [passengers[2]._id],
      pnr: "RB3H7Q9",
      boardingPointCity: "Hyderabad",
      boardingDateTime: tripBookingMeta[2].boardingDateTime,
      droppingPointCity: "Vijayawada",
      droppingDateTime: tripBookingMeta[2].droppingDateTime,
      couponApplied: coupons[2]._id,
      discountAmount: 38,
      totalAmount: 721,
      bookingStatus: "In Progress",
      cancelledAt: null,
    },
    {
      user: users[3]._id,
      trip: trips[3]._id,
      transaction: transactions[3]._id,
      seats: [firstAvailableSeats[3]],
      passengers: [passengers[3]._id],
      pnr: "RB9P2L5",
      boardingPointCity: "Bengaluru",
      boardingDateTime: tripBookingMeta[3].boardingDateTime,
      droppingPointCity: "Coimbatore",
      droppingDateTime: tripBookingMeta[3].droppingDateTime,
      couponApplied: null,
      discountAmount: 0,
      totalAmount: 699,
      bookingStatus: "Completed",
      cancelledAt: null,
    },
  ]);

  const seatIdUpdatePool = firstAvailableSeats.map((seatId, index) => ({
    id: seatId,
    booking: bookings[index % bookings.length]._id,
    passenger: passengers[index % passengers.length]._id,
  }));

  for (const item of seatIdUpdatePool) {
    await Seats.findByIdAndUpdate(item.id, {
      $set: { status: "Booked", booking: item.booking, passenger: item.passenger },
    });
  }

  for (const transaction of transactions) {
    await Transaction.findByIdAndUpdate(transaction._id, {
      booking: bookings.find((booking) => booking.user.toString() === transaction.user.toString())?._id ?? null,
    });
  }

  console.log("Fresh seed completed successfully");
  console.log({ operators: operators.length, buses: buses.length, routes: routes.length, trips: trips.length, users: users.length, passengers: passengers.length, coupons: coupons.length, transactions: transactions.length, bookings: bookings.length, seats: seatsToInsert.length });

  await mongoose.disconnect();
};

seedData().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
