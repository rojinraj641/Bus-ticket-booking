import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDistanceFromPlaces } from "../api/distance.helper.js";
import { convertHoursToHrMin } from "../utils/convertHr.js";
import { addTime } from "../utils/addTime.js";

const buildTimeFilter = (filters, field) => {
  const conditions = [];
  if (filters.includes("Before 6am")) conditions.push({ [field]: { $lt: "06:00" } });
  if (filters.includes("6am to 12pm")) conditions.push({ [field]: { $gte: "06:00", $lt: "12:00" } });
  if (filters.includes("12pm to 6pm")) conditions.push({ [field]: { $gte: "12:00", $lt: "18:00" } });
  if (filters.includes("After 6pm")) conditions.push({ [field]: { $gte: "18:00" } });
  return conditions.length ? { $or: conditions } : null;
};

const parseTimeToDecimal = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60;
};

const matchArrivalTime = (tripEndingTime, arrivalTimeFilter) => {
  const time = parseTimeToDecimal(tripEndingTime);
  if (arrivalTimeFilter.includes("Before 6 am") && time < 6) return true;
  if (arrivalTimeFilter.includes("6am to 12pm") && time >= 6 && time < 12) return true;
  if (arrivalTimeFilter.includes("12pm to 6pm") && time >= 12 && time < 18) return true;
  if (arrivalTimeFilter.includes("After 6pm") && time >= 18) return true;
  return false;
};

const normalizeInput = (str) => str.trim().replace(/\b\w/g, (l) => l.toUpperCase());
const filteredResult = asyncHandler(async (req, res) => {
  let { boarding, destination, departureTime, arrivalTime, busType, amenities, date } = req.query;
  console.log(`Date: ${date}`);

  if (!boarding || !destination) throw new ApiError(400, "Boarding point and destination point required");

  boarding = normalizeInput(boarding);
  destination = normalizeInput(destination);

  const parsedDate = new Date(date);
  const dayName = parsedDate.toLocaleDateString("en-US", { weekday: "long" });
  console.log(`dayName: ${dayName}`);

  const departureTimeFilter = departureTime ? departureTime.split(",") : [];
  const arrivalTimeFilter = arrivalTime ? arrivalTime.split(",") : [];
  const busTypeFilter = busType ? busType.split(",") : [];
  const amenitiesFilter = amenities ? amenities.split(",") : [];

  const distance = await getDistanceFromPlaces(boarding, destination);
  if (!distance) throw new ApiError(400, "Unable to calculate distance");

  const andConditions = [];

  andConditions.push({
    stoppingPoints: { $all: [boarding, destination] },
  });

  andConditions.push({
    day: { $in: [dayName] },
  });

  if (busTypeFilter.length) {
    andConditions.push({ busType: { $in: busTypeFilter } });
  }

  if (amenitiesFilter.length) {
    andConditions.push({ amenities: { $in: amenitiesFilter } });
  }
  console.log(`departureTimeFilter: ${departureTimeFilter}`)
  const departureConditions = buildTimeFilter(departureTimeFilter, "boardingTime");
  console.log(`departureConditions: ${departureConditions}`)
  if (departureConditions) {
    andConditions.push(departureConditions);
  }

  const matchStage = andConditions.length > 0 ? { $and: andConditions } : {};

  console.log("matchStage:", JSON.stringify(matchStage, null, 2));

  const buses = await Bus.aggregate([
    { $match: matchStage },
    {
      $addFields: {
        boardingIndex: { $indexOfArray: ["$stoppingPoints", boarding] },
        destinationIndex: { $indexOfArray: ["$stoppingPoints", destination] },
      },
    },
    {
      $match: {
        $expr: { $lt: ["$boardingIndex", "$destinationIndex"] },
      },
    },
    {
      $project: {
        _id: 1,
        busName: 1,
        day: 1,
        busType: 1,
        boardingTime: 1,
        ratings: 1,
        totalSeats: 1,
        totalDeck: 1,
        totalTravelTime: 1,
        totalDistance: 1,
        rowsPerDeck: 1,
        seatsPerRow: 1,
        amenities: 1,
      },
    },
  ]);

  if (!buses.length) return res.status(200).json(new ApiResponse(200, { busList: [] }, "No buses found"));

  const busIds = buses.map((bus) => bus._id);
  const busSeats = await Seats.aggregate([
    { $match: { busId: { $in: busIds } } },
    {
      $group: {
        _id: "$busId",
        seats: {
          $push: {
            seatType: "$seatType",
            basePrice: "$basePrice",
            seatNumber: "$seatNumber",
            seatPosition: "$seatPosition",
            isBooked: "$isBooked",
            bookedBy: "$bookedBy",
          },
        },
      },
    },
  ]);

  const seatMap = new Map();
  busSeats.forEach((group) => seatMap.set(group._id.toString(), group.seats));

  const busList = buses.map((bus) => {
    const seats = seatMap.get(bus._id.toString()) || [];
    const seaterSeats = seats.filter((s) => s.seatType === "Seater");
    const sleeperSeats = seats.filter((s) => s.seatType === "Sleeper");

    const seaterPrice = seaterSeats.length ? Math.min(...seaterSeats.map((s) => s.basePrice)) : null;
    const sleeperPrice = sleeperSeats.length ? Math.min(...sleeperSeats.map((s) => s.basePrice)) : null;

    const averageSpeed = bus.totalTravelTime ? (bus.totalDistance / bus.totalTravelTime) : 40;
    const estimatedTime = Math.ceil(distance / averageSpeed);
    const convertedTime = convertHoursToHrMin(estimatedTime);
    const tripEndingTime = addTime(bus.boardingTime, convertedTime);

    return {
      ...bus,
      seats,
      travellingTime: convertedTime,
      tripEndingTime,
      seaterPrice,
      sleeperPrice,
    };
  });

  const finalBusList = arrivalTimeFilter.length
    ? busList.filter((bus) => matchArrivalTime(bus.tripEndingTime, arrivalTimeFilter))
    : busList;

  finalBusList.sort((a, b) => parseTimeToDecimal(a.boardingTime) - parseTimeToDecimal(b.boardingTime));

  return res.status(200).json(new ApiResponse(200, { busList: finalBusList }));
});

export { filteredResult };