import { Bus } from "../models/bus.models.js";
import mongoose from "mongoose";

//Adding New Bus
async function addBus() {
    try {
        const buses = [
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000001"),
                busName: "Orange Travels Volvo",
                busNumber: "TS09AB1001",
                busType: ["AC", "Sleeper"],
                averageRating: 4.7,
                ratingCount: 342,
                totalSeats: 36,
                totalDeck: 1,
                amenities: ["WiFi", "Charging Point", "Blanket", "Water Bottle"],
                images: ["orange1.jpg", "orange2.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000002"),
                busName: "SRS Travels",
                busNumber: "KA01CD2002",
                busType: ["AC", "Seater"],
                averageRating: 4.2,
                ratingCount: 198,
                totalSeats: 45,
                totalDeck: 1,
                amenities: ["Charging Point", "CCTV"],
                images: ["srs1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000003"),
                busName: "VRL Travels",
                busNumber: "KA03EF3003",
                busType: ["Non AC", "Seater"],
                averageRating: 4.0,
                ratingCount: 156,
                totalSeats: 49,
                totalDeck: 1,
                amenities: ["Water Bottle"],
                images: ["vrl1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000004"),
                busName: "Kallada Travels",
                busNumber: "KL07GH4004",
                busType: ["AC", "Sleeper"],
                averageRating: 4.5,
                ratingCount: 281,
                totalSeats: 40,
                totalDeck: 1,
                amenities: ["WiFi", "Charging Point", "Reading Light"],
                images: ["kallada1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000005"),
                busName: "Parveen Travels",
                busNumber: "TN10JK5005",
                busType: ["AC", "Semi Sleeper"],
                averageRating: 4.3,
                ratingCount: 214,
                totalSeats: 42,
                totalDeck: 1,
                amenities: ["Charging Point", "Water Bottle"],
                images: ["parveen1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000006"),
                busName: "GreenLine Travels",
                busNumber: "AP16LM6006",
                busType: ["AC", "Sleeper"],
                averageRating: 4.8,
                ratingCount: 401,
                totalSeats: 30,
                totalDeck: 2,
                amenities: ["WiFi", "Charging Point", "Blanket", "TV"],
                images: ["greenline1.jpg", "greenline2.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000007"),
                busName: "Morning Star",
                busNumber: "TS12MN7007",
                busType: ["Non AC", "Semi Sleeper"],
                averageRating: 3.9,
                ratingCount: 98,
                totalSeats: 40,
                totalDeck: 1,
                amenities: ["Charging Point"],
                images: ["morningstar1.jpg"],
                status: "MAINTENANCE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000008"),
                busName: "Yolo Bus",
                busNumber: "MH14OP8008",
                busType: ["AC", "Seater"],
                averageRating: 4.6,
                ratingCount: 325,
                totalSeats: 48,
                totalDeck: 1,
                amenities: ["WiFi", "Charging Point", "Snacks"],
                images: ["yolo1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000009"),
                busName: "IntrCity SmartBus",
                busNumber: "DL05QR9009",
                busType: ["AC", "Sleeper"],
                averageRating: 4.4,
                ratingCount: 260,
                totalSeats: 34,
                totalDeck: 1,
                amenities: ["WiFi", "Blanket", "Charging Point", "GPS Tracking"],
                images: ["intrcity1.jpg"],
                status: "ACTIVE",
            },
            {
                operator: new mongoose.Types.ObjectId("687b00000000000000000010"),
                busName: "Royal Cruiser",
                busNumber: "TN22ST1010",
                busType: ["AC", "Sleeper"],
                averageRating: 3.8,
                ratingCount: 67,
                totalSeats: 36,
                totalDeck: 1,
                amenities: ["Charging Point", "Water Bottle"],
                images: ["royal1.jpg"],
                status: "INACTIVE",
            },
        ];
        if(await Bus.countDocuments() <= 10){
            const response = await Bus.insertMany(buses);
            if(response){
                console.log('Buses added successfully');
            }       
        }else{
            console.log("Buses already exist. Skipping insertion");
            return;
        }
    }
    catch (error) {
        console.log('Failed to add bus');
    }
}

export default addBus
