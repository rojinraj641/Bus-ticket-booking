import { Trip } from "../models/trip.models.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";

const addSeats = async () => {
  try {
    // Get all trips
    const trips = await Trip.find({})
      .select("_id tripCode bus")
      .lean();

    if (!trips.length) {
      throw new Error("No trips found.");
    }

    // Get the buses used by those trips
    const busIds = trips.map((trip) => trip.bus);

    const buses = await Bus.find({
      _id: { $in: busIds },
    })
      .select("_id busNumber busType totalSeats totalDeck")
      .lean();

    // Create a quick lookup map
    const busMap = new Map(
      buses.map((bus) => [
        bus._id.toString(),
        bus,
      ])
    );

    const seatData = [];

    // Generate seats for every trip
    for (const trip of trips) {
      const bus = busMap.get(trip.bus.toString());

      if (!bus) {
        throw new Error(
          `Bus not found for trip: ${trip.tripCode}`
        );
      }

      const isSleeper = bus.busType.includes("Sleeper");

      const totalSeats = bus.totalSeats;
      const totalDeck = bus.totalDeck;

      /*
       * If the bus has 1 deck:
       *
       * All seats -> Deck 1 / Lower
       *
       * If the bus has 2 decks:
       *
       * First half  -> Deck 1 / Lower
       * Second half -> Deck 2 / Upper
       */

      const seatsPerDeck =
        totalDeck === 2
          ? Math.ceil(totalSeats / 2)
          : totalSeats;

      for (let i = 1; i <= totalSeats; i++) {
        let deck = 1;
        let seatPosition = "Lower";

        if (totalDeck === 2 && i > seatsPerDeck) {
          deck = 2;
          seatPosition = "Upper";
        }

        seatData.push({
          trip: trip._id,
          bus: bus._id,

          seatNumber: `S${i}`,

          seatType: isSleeper
            ? "Sleeper"
            : "Seater",

          seatPosition,

          deck,

          priceModifier: 0,

          status: "Available",

          lockedBy: null,
          lockExpiresAt: null,
          booking: null,
          passenger: null,
          genderRestriction: null,
        });
      }

      console.log(
        `${trip.tripCode} → ${bus.busNumber} → ${bus.busType} → ${totalSeats} seats → ${totalDeck} deck(s)`
      );
    }

    // Remove old dummy seats
    await Seats.deleteMany({});

    // Insert new seats
    await Seats.insertMany(seatData);

    console.log(
      `\nSuccessfully created ${seatData.length} seats.`
    );
  } catch (error) {
    console.error(
      "Error while seeding seats:",
      error
    );
  }
};

export default addSeats;