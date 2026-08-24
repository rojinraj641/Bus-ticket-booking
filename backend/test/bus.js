import { Bus } from "../models/bus.models.js";
import { Operator } from "../models/operator.models.js";

const addBuses = async () => {
  try {
    const operatorNames = [
      "Sundar Express",
      "Blue Mountain Travels",
      "Royal Coach Lines",
      "Green Valley Transit",
      "Golden Chariot Travels",
      "Silver Line Express",
      "Rajdhani Roadways",
      "Superfast Travels Co",
      "Comfort Ride Lines",
      "Namma Travels",
    ];

    // Find all operators using their names
    const operators = await Operator.find({
      name: { $in: operatorNames },
    }).select("_id name");

    // Convert operators into an object:
    // {
    //   "Sundar Express": ObjectId(...),
    //   "Blue Mountain Travels": ObjectId(...),
    //   ...
    // }
    const operatorMap = new Map(
      operators.map((operator) => [operator.name, operator._id])
    );

    const buses = [
      {
        operator: operatorMap.get("Sundar Express"),
        busName: "Sundar Express Volvo",
        busNumber: "KL01AB1234",
        busType: "AC Sleeper",
        averageRating: 4.5,
        ratingCount: 128,
        totalSeats: 36,
        totalDeck: 2,
        amenities: [
          "WiFi",
          "Charging Point",
          "Blanket",
          "Water Bottle",
          "Reading Light",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Blue Mountain Travels"),
        busName: "Blue Mountain Premium",
        busNumber: "KL02CD5678",
        busType: "AC Seater",
        averageRating: 4.2,
        ratingCount: 95,
        totalSeats: 40,
        totalDeck: 1,
        amenities: [
          "WiFi",
          "Charging Point",
          "Water Bottle",
          "Air Conditioning",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Royal Coach Lines"),
        busName: "Royal Coach Sleeper",
        busNumber: "TN38EF9012",
        busType: "AC Sleeper",
        averageRating: 4.7,
        ratingCount: 214,
        totalSeats: 32,
        totalDeck: 2,
        amenities: [
          "WiFi",
          "Charging Point",
          "Blanket",
          "Pillow",
          "Water Bottle",
          "Reading Light",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Green Valley Transit"),
        busName: "Green Valley Express",
        busNumber: "KA05GH3456",
        busType: "Non AC Seater",
        averageRating: 3.9,
        ratingCount: 67,
        totalSeats: 45,
        totalDeck: 1,
        amenities: [
          "Charging Point",
          "Water Bottle",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Golden Chariot Travels"),
        busName: "Golden Chariot Luxury",
        busNumber: "AP28IJ7890",
        busType: "AC Sleeper",
        averageRating: 4.8,
        ratingCount: 310,
        totalSeats: 36,
        totalDeck: 2,
        amenities: [
          "WiFi",
          "Charging Point",
          "Blanket",
          "Pillow",
          "Water Bottle",
          "Reading Light",
          "Entertainment",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Silver Line Express"),
        busName: "Silver Line AC",
        busNumber: "TS09KL2345",
        busType: "AC Seater",
        averageRating: 4.1,
        ratingCount: 82,
        totalSeats: 40,
        totalDeck: 1,
        amenities: [
          "WiFi",
          "Charging Point",
          "Water Bottle",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Rajdhani Roadways"),
        busName: "Rajdhani Volvo Sleeper",
        busNumber: "DL01MN6789",
        busType: "AC Sleeper",
        averageRating: 4.6,
        ratingCount: 189,
        totalSeats: 36,
        totalDeck: 2,
        amenities: [
          "WiFi",
          "Charging Point",
          "Blanket",
          "Pillow",
          "Water Bottle",
          "Reading Light",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Superfast Travels Co"),
        busName: "Superfast Express",
        busNumber: "TN10OP1234",
        busType: "Non AC Sleeper",
        averageRating: 3.8,
        ratingCount: 54,
        totalSeats: 36,
        totalDeck: 2,
        amenities: [
          "Charging Point",
          "Blanket",
          "Water Bottle",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Comfort Ride Lines"),
        busName: "Comfort Ride Premium",
        busNumber: "KA03QR5678",
        busType: "AC Seater",
        averageRating: 4.3,
        ratingCount: 116,
        totalSeats: 40,
        totalDeck: 1,
        amenities: [
          "WiFi",
          "Charging Point",
          "Water Bottle",
          "Reading Light",
        ],
        images: [],
        status: "ACTIVE",
      },

      {
        operator: operatorMap.get("Namma Travels"),
        busName: "Namma Travels Sleeper",
        busNumber: "KA01ST9012",
        busType: "AC Sleeper",
        averageRating: 4.4,
        ratingCount: 143,
        totalSeats: 36,
        totalDeck: 2,
        amenities: [
          "WiFi",
          "Charging Point",
          "Blanket",
          "Pillow",
          "Water Bottle",
        ],
        images: [],
        status: "ACTIVE",
      },
    ];

    // Make sure every operator was found
    const missingOperators = operatorNames.filter(
      (name) => !operatorMap.has(name)
    );

    if (missingOperators.length > 0) {
      throw new Error(
        `These operators were not found: ${missingOperators.join(", ")}`
      );
    }
    await Bus.deleteMany({});

    if(await Bus.countDocuments() < 10){
         await Bus.insertMany(buses);
         console.log("Buses seeded successfully!");
    }else{
        console.log("Total 10 buses added");
    }
  } catch (error) {
    console.error("Error seeding buses:", error);
  }
};

export default addBuses;