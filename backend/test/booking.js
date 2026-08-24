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
        user: new mongoose.Types.ObjectId("687a00000000000000000011"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000021"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000031"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000041")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000051")
        ],
        pnr: "RB200001",
        boardingPointCity: "Mumbai",
        boardingDateTime: new Date("2026-09-10T22:00:00Z"),
        droppingPointCity: "Pune",
        droppingDateTime: new Date("2026-09-11T01:00:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 599,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000012"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000022"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000032"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000042"),
          new mongoose.Types.ObjectId("687a00000000000000000043")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000052"),
          new mongoose.Types.ObjectId("687a00000000000000000053")
        ],
        pnr: "RB200002",
        boardingPointCity: "Delhi",
        boardingDateTime: new Date("2026-09-12T21:30:00Z"),
        droppingPointCity: "Jaipur",
        droppingDateTime: new Date("2026-09-13T02:30:00Z"),
        couponApplied: new mongoose.Types.ObjectId("687a00000000000000000061"),
        discountAmount: 150,
        totalAmount: 749,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000013"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000023"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000033"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000044")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000054")
        ],
        pnr: "RB200003",
        boardingPointCity: "Kolkata",
        boardingDateTime: new Date("2026-09-14T20:00:00Z"),
        droppingPointCity: "Bhubaneswar",
        droppingDateTime: new Date("2026-09-15T04:00:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 1499,
        bookingStatus: "Completed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000014"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000024"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000034"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000045")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000055")
        ],
        pnr: "RB200004",
        boardingPointCity: "Ahmedabad",
        boardingDateTime: new Date("2026-09-16T06:00:00Z"),
        droppingPointCity: "Udaipur",
        droppingDateTime: new Date("2026-09-16T10:30:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 699,
        bookingStatus: "Cancelled",
        cancelledAt: new Date("2026-09-15T12:00:00Z")
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000015"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000025"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000035"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000046")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000056")
        ],
        pnr: "RB200005",
        boardingPointCity: "Pune",
        boardingDateTime: new Date("2026-09-18T19:45:00Z"),
        droppingPointCity: "Goa",
        droppingDateTime: new Date("2026-09-19T04:45:00Z"),
        couponApplied: null,
        discountAmount: 100,
        totalAmount: 1699,
        bookingStatus: "In Progress"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000016"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000026"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000036"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000047")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000057")
        ],
        pnr: "RB200006",
        boardingPointCity: "Mumbai",
        boardingDateTime: new Date("2026-09-20T23:30:00Z"),
        droppingPointCity: "Pune",
        droppingDateTime: new Date("2026-09-21T02:30:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 649,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000017"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000027"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000037"),
        seats: [
          new mongoose.Types.ObjectId("687a00000000000000000048"),
          new mongoose.Types.ObjectId("687a00000000000000000049")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a00000000000000000058"),
          new mongoose.Types.ObjectId("687a00000000000000000059")
        ],
        pnr: "RB200007",
        boardingPointCity: "Delhi",
        boardingDateTime: new Date("2026-09-22T21:30:00Z"),
        droppingPointCity: "Jaipur",
        droppingDateTime: new Date("2026-09-23T02:30:00Z"),
        couponApplied: new mongoose.Types.ObjectId("687a00000000000000000062"),
        discountAmount: 200,
        totalAmount: 699,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000018"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000028"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000038"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000004A")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000005A")
        ],
        pnr: "RB200008",
        boardingPointCity: "Kolkata",
        boardingDateTime: new Date("2026-09-24T20:00:00Z"),
        droppingPointCity: "Bhubaneswar",
        droppingDateTime: new Date("2026-09-25T04:00:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 1499,
        bookingStatus: "Completed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000019"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000029"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000039"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000004B")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000005B")
        ],
        pnr: "RB200009",
        boardingPointCity: "Ahmedabad",
        boardingDateTime: new Date("2026-09-26T06:00:00Z"),
        droppingPointCity: "Udaipur",
        droppingDateTime: new Date("2026-09-26T10:30:00Z"),
        couponApplied: null,
        discountAmount: 50,
        totalAmount: 649,
        bookingStatus: "Confirmed"
      },
      {
        user: new mongoose.Types.ObjectId("687a00000000000000000020"),
        trip: new mongoose.Types.ObjectId("687a00000000000000000030"),
        transaction: new mongoose.Types.ObjectId("687a00000000000000000040"),
        seats: [
          new mongoose.Types.ObjectId("687a0000000000000000004C")
        ],
        passengers: [
          new mongoose.Types.ObjectId("687a0000000000000000005C")
        ],
        pnr: "RB200010",
        boardingPointCity: "Pune",
        boardingDateTime: new Date("2026-09-28T19:45:00Z"),
        droppingPointCity: "Goa",
        droppingDateTime: new Date("2026-09-29T04:45:00Z"),
        couponApplied: null,
        discountAmount: 0,
        totalAmount: 1799,
        bookingStatus: "In Progress"
      }
    ]
    const response = await Booking.insertMany(bookings);
    if(response){
      console.log("Bookings added successfully");
    }
  } catch (error) {
    console.error("Booking Failed:", error.message);
  }
}

export default addBooking;
