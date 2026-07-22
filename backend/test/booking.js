import mongoose from "mongoose";
import {Booking} from "../models/booking.models.js";

async function addBooking() {
  try {
    if(await Booking.countDocuments() >= 10) {
      console.log("Bookings already exist. Skipping insertion");
      return;
    }
    const bookings = [
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000001"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000011"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000021"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000031")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000041")
        ],
        pnr: "RB100001",
        boardingPointCity: "Hyderabad",
        boardingDateTime: new Date("2026-07-20T20:30:00Z"),
        droppingPointCity: "Bangalore",
        droppingDateTime: new Date("2026-07-21T06:15:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 950,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000002"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000012"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000022"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000032"),
          new mongoose.Types.ObjectId("687a00000000000000000033")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000042"),
          new mongoose.Types.ObjectId("687a00000000000000000043")
        ],
        pnr: "RB100002",
        boardingPointCity: "Chennai",
        boardingDateTime: new Date("2026-07-22T18:00:00Z"),
        droppingPointCity: "Coimbatore",
        droppingDateTime: new Date("2026-07-23T03:30:00Z"),
        couponApplied: new mongoose.Types.ObjectId("687a00000000000000000051"),
        discountAmount: 150,
        totalAmount: 1450,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000003"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000013"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000023"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000034")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000044")
        ],
        pnr: "RB100003",
        boardingPointCity: "Delhi",
        boardingDateTime: new Date("2026-07-25T16:30:00Z"),
        droppingPointCity: "Jaipur",
        droppingDateTime: new Date("2026-07-25T22:30:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 650,
        bookingStatus: "Completed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000004"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000014"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000024"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000035")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000045")
        ],
        pnr: "RB100004",
        boardingPointCity: "Mumbai",
        boardingDateTime: new Date("2026-07-26T19:00:00Z"),
        droppingPointCity: "Pune",
        droppingDateTime: new Date("2026-07-26T23:30:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 500,
        bookingStatus: "Cancelled",
        cancelledAt: new Date("2026-07-25T10:00:00Z")
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000005"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000015"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000025"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000036")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000046")
        ],
        pnr: "RB100005",
        boardingPointCity: "Kochi",
        boardingDateTime: new Date("2026-07-28T21:00:00Z"),
        droppingPointCity: "Trivandrum",
        droppingDateTime: new Date("2026-07-29T02:30:00Z"),
        couponApplied: null,
        discountAmount: 50,
        totalAmount: 700,
        bookingStatus: "In Progress"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000006"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000016"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000026"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000037")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000047")
        ],
        pnr: "RB100006",
        boardingPointCity: "Hyderabad",
        boardingDateTime: new Date("2026-07-30T22:00:00Z"),
        droppingPointCity: "Vijayawada",
        droppingDateTime: new Date("2026-07-31T05:00:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 850,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000007"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000017"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000027"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000038"),
          new mongoose.Types.ObjectId("687a00000000000000000039")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000048"),
          new mongoose.Types.ObjectId("687a00000000000000000049")
        ],
        pnr: "RB100007",
        boardingPointCity: "Bangalore",
        boardingDateTime: new Date("2026-08-01T20:00:00Z"),
        droppingPointCity: "Goa",
        droppingDateTime: new Date("2026-08-02T08:30:00Z"),
        couponApplied: new mongoose.Types.ObjectId("687a00000000000000000052"),
        discountAmount: 200,
        totalAmount: 1800,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000008"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000018"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000028"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000003A")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000004A")
        ],
        pnr: "RB100008",
        boardingPointCity: "Pune",
        boardingDateTime: new Date("2026-08-03T17:00:00Z"),
        droppingPointCity: "Nagpur",
        droppingDateTime: new Date("2026-08-04T04:30:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 1200,
        bookingStatus: "Completed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000009"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000019"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000029"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000003B")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000004B")
        ],
        pnr: "RB100009",
        boardingPointCity: "Mysore",
        boardingDateTime: new Date("2026-08-05T15:30:00Z"),
        droppingPointCity: "Bangalore",
        droppingDateTime: new Date("2026-08-05T19:30:00Z"),
        couponApplied: null,
        discountAmount: 25,
        totalAmount: 475,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000010"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000020"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000030"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000003C")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000004C")
        ],
        pnr: "RB100010",
        boardingPointCity: "Visakhapatnam",
        boardingDateTime: new Date("2026-08-06T18:30:00Z"),
        droppingPointCity: "Hyderabad",
        droppingDateTime: new Date("2026-08-07T06:30:00Z"),
        couponApplied: null,
        discountAmount: 100,
        totalAmount: 1100,
        bookingStatus: "In Progress"
      }
    ]
    const response = await Booking.insertMany(bookings);
    if(response){
      console.log("Bookings added successfully");
    }
  } catch (error) {
    console.error("❌ Booking Failed:", error.message);
  }
}

export default addBooking;
