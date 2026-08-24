import { Trip } from "../models/trip.models.js";
import { Bus } from "../models/bus.models.js";
import { Route } from "../models/route.models.js";
import { Operator } from "../models/operator.models.js";

const addTrips = async () => {
  try {
    // --------------------------------------------------
    // 1. Get operators
    // --------------------------------------------------

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

    const operators = await Operator.find({
      name: { $in: operatorNames },
    }).select("_id name status");

    // Create:
    // Operator Name -> Operator ObjectId
    const operatorMap = new Map(
      operators.map((operator) => [
        operator.name,
        operator._id,
      ])
    );

    // --------------------------------------------------
    // 2. Get buses
    // --------------------------------------------------

    const buses = await Bus.find({
      operator: {
        $in: operators.map((operator) => operator._id),
      },
    }).select("_id operator busName busNumber totalSeats status");

    // --------------------------------------------------
    // 3. Get routes
    // --------------------------------------------------

    const routes = await Route.find({
      operator: {
        $in: operators.map((operator) => operator._id),
      },
    }).select(
      "_id operator sourceCity destinationCity routeCode status"
    );

    // --------------------------------------------------
    // 4. Create maps
    // --------------------------------------------------

    // Operator ObjectId -> Bus
    const busMap = new Map(
      buses.map((bus) => [
        bus.operator.toString(),
        bus,
      ])
    );

    // Operator ObjectId -> Route
    const routeMap = new Map(
      routes.map((route) => [
        route.operator.toString(),
        route,
      ])
    );

    // --------------------------------------------------
    // 5. Create dummy trips
    // --------------------------------------------------

    const tripData = [
      {
        operatorName: "Sundar Express",
        departureTime: "21:30",
        basePrice: 899,
        status: "SCHEDULED",
      },

      {
        operatorName: "Blue Mountain Travels",
        departureTime: "22:00",
        basePrice: 749,
        status: "SCHEDULED",
      },

      {
        operatorName: "Royal Coach Lines",
        departureTime: "20:45",
        basePrice: 999,
        status: "SCHEDULED",
      },

      {
        operatorName: "Green Valley Transit",
        departureTime: "19:30",
        basePrice: 699,
        status: "SCHEDULED",
      },

      {
        operatorName: "Golden Chariot Travels",
        departureTime: "23:00",
        basePrice: 599,
        status: "SCHEDULED",
      },

      {
        operatorName: "Silver Line Express",
        departureTime: "21:00",
        basePrice: 799,
        status: "SCHEDULED",
      },

      {
        operatorName: "Rajdhani Roadways",
        departureTime: "22:30",
        basePrice: 649,
        status: "SCHEDULED",
      },

      {
        operatorName: "Superfast Travels Co",
        departureTime: "20:00",
        basePrice: 499,
        status: "SCHEDULED",
      },

      {
        operatorName: "Comfort Ride Lines",
        departureTime: "21:45",
        basePrice: 599,
        status: "SCHEDULED",
      },

      {
        operatorName: "Namma Travels",
        departureTime: "22:15",
        basePrice: 549,
        status: "SCHEDULED",
      },
    ];

    const trips = tripData.map((data, index) => {
      const operatorId = operatorMap.get(data.operatorName);

      if (!operatorId) {
        throw new Error(
          `Operator not found: ${data.operatorName}`
        );
      }

      const operatorKey = operatorId.toString();

      const bus = busMap.get(operatorKey);
      const route = routeMap.get(operatorKey);

      if (!bus) {
        throw new Error(
          `Bus not found for operator: ${data.operatorName}`
        );
      }

      if (!route) {
        throw new Error(
          `Route not found for operator: ${data.operatorName}`
        );
      }

      // Extra safety check
      if (bus.operator.toString() !== operatorKey) {
        throw new Error(
          `Bus operator mismatch for ${data.operatorName}`
        );
      }

      if (route.operator.toString() !== operatorKey) {
        throw new Error(
          `Route operator mismatch for ${data.operatorName}`
        );
      }

      return {
        bus: bus._id,
        route: route._id,
        operator: operatorId,

        departureTime: data.departureTime,
        basePrice: data.basePrice,

        // Initially all seats are available
        availableSeatsCount: bus.totalSeats,

        status: data.status,

        tripCode: `TRIP-${String(index + 1).padStart(3, "0")}`,
      };
    });

    // --------------------------------------------------
    // 6. Clear existing trips
    // --------------------------------------------------

    await Trip.deleteMany({});

    // --------------------------------------------------
    // 7. Insert trips
    // --------------------------------------------------

    await Trip.insertMany(trips);

    console.log("Trips added successfully!");

    trips.forEach((trip) => {
      console.log(
        `${trip.tripCode} → ${trip.departureTime} → ₹${trip.basePrice}`
      );
    });
  } catch (error) {
    console.error("Error seeding trips:", error);
  }
};

export default addTrips;