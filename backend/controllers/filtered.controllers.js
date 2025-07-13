import asyncHandler from "../utils/asyncHandler.js";
import { Bus } from "../models/bus.models.js";
import { Seats } from "../models/seats.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDistanceFromPlaces } from "../api/distance.helper.js";
import { convertHoursToHrMin } from "../utils/convertHr.js";
import { addTime } from "../utils/addTime.js";

const filteredResult = asyncHandler(async (req, res) => {

    //Boarding point and destination point entered by the user is destructured 
    const { boarding, destination, departureTime, arrivalTime, busType, amenities } = req.query;
    console.log(boarding);
    console.log(destination);

    const departureTimeFilter = departureTime ? departureTime.split(',') : [];
    const arrivalTimeFilter = arrivalTime ? arrivalTime.split(',') : [];
    const busTypeFilter = busType ? busType.split(',') : [];
    const amenitiesFilter = amenities ? amenities.split(',') : [];


    if (!boarding || !destination) {
        throw new ApiError(200, 'Boarding point and destination point required');
    }

    //Distance is calculated using an external api
    const distance = await getDistanceFromPlaces(boarding, destination);
    if (!distance) {
        throw new ApiError(400, "Distance not able to calculate");
    }

    //Combining matching fields in matchStage
    const matchStage = {
        stoppingPoints: { $all: [boarding, destination] },
    }
    if (busTypeFilter.length > 0) {
        matchStage.busType = { $in: busTypeFilter };
    }
    if (amenitiesFilter.length > 0) {
        matchStage.amenities = { $in: amenitiesFilter };
    }
    const conditions = []
    if (departureTimeFilter.length > 0) {
        const departureConditions = []
        if (departureTimeFilter.includes('Before 6 am')) {
            departureConditions.push({ departureTime: { $lt: "06:00" } });
        }

        if (departureTimeFilter.includes('6am to 12pm')) {
            departureConditions.push({ departureTime: { $gte: "06:00", $lt: "12:00" } });
        }

        if (departureTimeFilter.includes('12pm to 6pm')) {
            departureConditions.push({ departureTime: { $gte: "12:00", $lt: "18:00" } });
        }

        if (departureTimeFilter.includes('After 6pm')) {
            departureConditions.push({ departureTime: { $gte: "18:00" } });
        }
        if(departureConditions.length>0){
            conditions.push({$or: departureConditions})
        }
    }

    if(arrivalTimeFilter.length>0){
        const arrivalConditions = []
        if(arrivalTimeFilter.includes('Before 6am')){
            arrivalConditions.push({ arrivalTime: {$lt: '06:00'}})
        }
        if(arrivalTimeFilter.includes('6am to 12pm')){
            arrivalConditions.push({ arrivalTime: {$gte: '06:00',$lt: '12:00'}})
        }
        if(arrivalTimeFilter.includes('12pm to 6pm')){
            arrivalConditions.push({ arrivalTime: {$gt:'12:00',$lt: '18:00'}})
        }
        if(arrivalTimeFilter.includes('After 6pm')){
            arrivalConditions.push({ arrivalTime: {$gt: '18:00'}})
        }
        if(arrivalConditions.length>0){
            conditions.push({$or: arrivalConditions})
        }
    }
    if(conditions.length>0){
        matchStage.$and = conditions;
    }

    //Fetching Bus details
    const buses = await Bus.aggregate([
        {
            $match: matchStage
        },
        {
            $addFields: {
                boardingIndex: { $indexOfArray: ["$stoppingPoints", boarding] },
                destinationIndex: { $indexOfArray: ["$stoppingPoints", destination] }
            }
        },
        {
            $match: {
                $expr: { $lt: ["$boardingIndex", "$destinationIndex"] }
            }
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
            }
        }
    ]);

    //Calculating the average Speed
    const averageSpeed = buses.map((bus) => {
        return (bus.totalDistance / bus.totalTravelTime)
    })

    //Calculating the time required
    const timeRequired = averageSpeed.map((speed) => {
        return Math.ceil(distance / speed)
    })

    //Converting decimal form of time into hr:min
    const convertedTime = timeRequired.map((time) => {
        return convertHoursToHrMin(time);
    })

    //Calculate the time of reaching the destination
    const destinationReachingTime = buses.map((bus, index) => {
        return addTime(bus.boardingTime, convertedTime[index]);
    })

    //Fetching busId
    const busIds = buses.map(bus => bus._id);

    //Fetching seat details
    const busSeats = await Seats.aggregate([
        { $match: { busId: { $in: busIds } } },
        {
            $group: {
                _id: "$busId",
                seats: { $push: { seatType: "$seatType", basePrice: "$basePrice", seatNumber: "$seatNumber", seatPosition: "$seatPosition", isBooked: "$isBooked", bookedBy: "$bookedBy" } }
            }
        }
    ]);

    //Calculate the price fare
    const seaterPrices = busSeats.map((group) => {
        const seaterSeats = group.seats.filter(seat => seat.seatType === "Seater");
        const prices = seaterSeats.map(seat => seat.basePrice);
        return prices.length > 0 ? Math.min(...prices) : null;
    });

    //Calculating the sleeper fare
    const sleeperPrices = busSeats.map((group) => {
        const sleeperSeats = group.seats.filter(seat => seat.seatType === 'Sleeper');
        const prices = sleeperSeats.map(seat => seat.basePrice);
        return prices.length > 0 ? Math.max(...prices) : null
    })

    //Making a unified data 
    const busList = buses.map((bus, index) => {
        return {
            ...bus,
            seats: busSeats.find(seatGroup => seatGroup._id.toString() === bus._id.toString())?.seats || [],
            travellingTime: convertedTime[index],
            tripEndingTime: destinationReachingTime[index],
            seaterPrice: seaterPrices[index],
            sleeperPrice: sleeperPrices[index]
        };
    });

    //Sending response to the front side
    if (buses && busSeats && distance) {
        return res.status(200).json(new ApiResponse(200, { busList }));
    }
    else {
        throw new ApiError(404, 'Data fetching failed');
    }
});

export { filteredResult };
