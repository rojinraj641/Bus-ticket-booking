import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDistanceFromPlaces } from "../api/distance.helper.js";
import { buildTimeMatch } from "../utils/buildTimeMatch.js";

const filteredResult = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { boarding, destination, date, departureTime, arrivalTime, busType, amenities } = req.body;

  if (!boarding || !destination || !date) {
    return res.status(400).json(
      new ApiError(400, null, "Missing required query params")
    );
  }

  let distance = await getDistanceFromPlaces(boarding,destination);

  const timestamp = Number(date);
  if (!Number.isFinite(timestamp)) {
    return res.status(400).json(
      new ApiError(400, null, "Invalid date")
    );
  }

  const dayName = new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const departureFilter = buildTimeMatch("departureTime", departureTime);
  const arrivalFilter = buildTimeMatch("arrivalTime", arrivalTime);
  const timeConditions = [];
  if(departureFilter){
    timeConditions.push(departureFilter);
  }
  if(arrivalFilter){
    timeConditions.push(arrivalFilter);
  }

  const matchStage = {
    day: {$in: [dayName]},
    stoppingPoints: {
      $all: [
        { $elemMatch: { city: boarding } },
        { $elemMatch: { city: destination } }
      ]
    },
  }
  
  if (Array.isArray(busType) && busType.length > 0) {
    matchStage.busType = { $in: busType };
  }
  if (Array.isArray(amenities) && amenities.length > 0) {
    matchStage.amenities = { $in: amenities };
  }

  const pipeline = [
    {
      $match: matchStage
    },
    {
      $addFields: {
        boardingPoint: {
          $first: {
            $filter: {
              input: "$stoppingPoints",
              as: "sp",
              cond: { $eq: ["$$sp.city", boarding] }
            }
          }
        },
        destinationPoint: {
          $first: {
            $filter: {
              input: "$stoppingPoints",
              as: "sp",
              cond: { $eq: ["$$sp.city", destination] }
            }
          }
        }
      }
    },
    {
      $match: {
        $expr: {
          $lt: ["$boardingPoint.order", "$destinationPoint.order"]
        }
      }
    },
    {
      $addFields: {
        departureTime: {
          $add: ["$tripStartingTime", "$boardingPoint.timeFromStart"]
        },
        arrivalTime: {
          $add: ["$tripStartingTime", "$destinationPoint.timeFromStart"]
        }
      }
    },
  ];

  if(timeConditions.length>0){
    pipeline.push({
      $match: {
        $and: timeConditions
      }
    },
   {
      $sort: { ratings: -1,_id: 1 }
    })
  }

  const buses = await Bus.aggregatePaginate(
    Bus.aggregate(pipeline),
    { page, limit }
  )
  console.log('Buses found for this route: ', buses)

  if (!buses.docs.length) {
    return res.status(200).json(
      new ApiResponse(200, { busList: [] }, "No buses found")
    );
  }

  const seats = await Seats.find({
    busId: { $in: buses.docs.map(b => b._id) }
  });


  return res.status(200).json(
    new ApiResponse(200, { busList: buses.docs, seats: seats, distance }, "Success")
  );
});

export { filteredResult }