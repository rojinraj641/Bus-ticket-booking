import { Route } from "../models/route.models.js";
import { Operator } from "../models/operator.models.js";

const addRoutes = async () => {
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

    // Find existing operators
    const operators = await Operator.find({
      name: { $in: operatorNames },
    }).select("_id name");

    // Create operator name -> ObjectId map
    const operatorMap = new Map(
      operators.map((operator) => [
        operator.name,
        operator._id,
      ])
    );

    // Make sure all operators exist
    const missingOperators = operatorNames.filter(
      (name) => !operatorMap.has(name)
    );

    if (missingOperators.length > 0) {
      throw new Error(
        `Operators not found: ${missingOperators.join(", ")}`
      );
    }

    const routes = [
      // --------------------------------------------------
      // 1. Hyderabad -> Bangalore
      // --------------------------------------------------
      {
        operator: operatorMap.get("Sundar Express"),
        sourceCity: "Hyderabad",
        destinationCity: "Bangalore",
        totalDistanceKm: 570,
        totalDurationMinutes: 660,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Hyderabad",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "MGBS Bus Station",
          },
          {
            order: 2,
            city: "Kurnool",
            offsetFromStartMinutes: 180,
            distanceFromStartKm: 210,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Kurnool RTC Bus Stand",
          },
          {
            order: 3,
            city: "Anantapur",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 360,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Anantapur Bus Stand",
          },
          {
            order: 4,
            city: "Bangalore",
            offsetFromStartMinutes: 660,
            distanceFromStartKm: 570,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Kempegowda Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "HYD-BLR-001",
      },

      // --------------------------------------------------
      // 2. Bangalore -> Chennai
      // --------------------------------------------------
      {
        operator: operatorMap.get("Blue Mountain Travels"),
        sourceCity: "Bangalore",
        destinationCity: "Chennai",
        totalDistanceKm: 350,
        totalDurationMinutes: 420,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Bangalore",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Kempegowda Bus Station",
          },
          {
            order: 2,
            city: "Hosur",
            offsetFromStartMinutes: 60,
            distanceFromStartKm: 40,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Hosur Bus Stand",
          },
          {
            order: 3,
            city: "Krishnagiri",
            offsetFromStartMinutes: 120,
            distanceFromStartKm: 90,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Krishnagiri Bus Stand",
          },
          {
            order: 4,
            city: "Vellore",
            offsetFromStartMinutes: 240,
            distanceFromStartKm: 215,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Vellore New Bus Stand",
          },
          {
            order: 5,
            city: "Chennai",
            offsetFromStartMinutes: 420,
            distanceFromStartKm: 350,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "CMBT Koyambedu",
          },
        ],
        status: "ACTIVE",
        routeCode: "BLR-MAA-001",
      },

      // --------------------------------------------------
      // 3. Kochi -> Bangalore
      // --------------------------------------------------
      {
        operator: operatorMap.get("Royal Coach Lines"),
        sourceCity: "Kochi",
        destinationCity: "Bangalore",
        totalDistanceKm: 550,
        totalDurationMinutes: 720,
        operatingDays: [
          "Monday",
          "Wednesday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Kochi",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Vyttila Mobility Hub",
          },
          {
            order: 2,
            city: "Thrissur",
            offsetFromStartMinutes: 90,
            distanceFromStartKm: 80,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Thrissur KSRTC Stand",
          },
          {
            order: 3,
            city: "Palakkad",
            offsetFromStartMinutes: 180,
            distanceFromStartKm: 150,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Palakkad Bus Stand",
          },
          {
            order: 4,
            city: "Coimbatore",
            offsetFromStartMinutes: 240,
            distanceFromStartKm: 200,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Gandhipuram Bus Stand",
          },
          {
            order: 5,
            city: "Salem",
            offsetFromStartMinutes: 390,
            distanceFromStartKm: 340,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Salem Central Bus Stand",
          },
          {
            order: 6,
            city: "Bangalore",
            offsetFromStartMinutes: 720,
            distanceFromStartKm: 550,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Kempegowda Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "COK-BLR-001",
      },

      // --------------------------------------------------
      // 4. Chennai -> Hyderabad
      // --------------------------------------------------
      {
        operator: operatorMap.get("Green Valley Transit"),
        sourceCity: "Chennai",
        destinationCity: "Hyderabad",
        totalDistanceKm: 630,
        totalDurationMinutes: 780,
        operatingDays: [
          "Tuesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Chennai",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "CMBT Koyambedu",
          },
          {
            order: 2,
            city: "Nellore",
            offsetFromStartMinutes: 180,
            distanceFromStartKm: 175,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Nellore RTC Bus Stand",
          },
          {
            order: 3,
            city: "Ongole",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 290,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Ongole Bus Stand",
          },
          {
            order: 4,
            city: "Vijayawada",
            offsetFromStartMinutes: 420,
            distanceFromStartKm: 430,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Pandit Nehru Bus Station",
          },
          {
            order: 5,
            city: "Hyderabad",
            offsetFromStartMinutes: 780,
            distanceFromStartKm: 630,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "MGBS Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "MAA-HYD-001",
      },

      // --------------------------------------------------
      // 5. Mumbai -> Pune
      // --------------------------------------------------
      {
        operator: operatorMap.get("Golden Chariot Travels"),
        sourceCity: "Mumbai",
        destinationCity: "Pune",
        totalDistanceKm: 150,
        totalDurationMinutes: 210,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Mumbai",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Dadar Bus Terminal",
          },
          {
            order: 2,
            city: "Navi Mumbai",
            offsetFromStartMinutes: 45,
            distanceFromStartKm: 30,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Vashi Bus Depot",
          },
          {
            order: 3,
            city: "Lonavala",
            offsetFromStartMinutes: 120,
            distanceFromStartKm: 85,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Lonavala Bus Stand",
          },
          {
            order: 4,
            city: "Pune",
            offsetFromStartMinutes: 210,
            distanceFromStartKm: 150,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Swargate Bus Stand",
          },
        ],
        status: "ACTIVE",
        routeCode: "BOM-PNQ-001",
      },

      // --------------------------------------------------
      // 6. Bangalore -> Hyderabad
      // --------------------------------------------------
      {
        operator: operatorMap.get("Silver Line Express"),
        sourceCity: "Bangalore",
        destinationCity: "Hyderabad",
        totalDistanceKm: 570,
        totalDurationMinutes: 660,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Bangalore",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Kempegowda Bus Station",
          },
          {
            order: 2,
            city: "Anantapur",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 210,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Anantapur Bus Stand",
          },
          {
            order: 3,
            city: "Kurnool",
            offsetFromStartMinutes: 450,
            distanceFromStartKm: 360,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Kurnool RTC Bus Stand",
          },
          {
            order: 4,
            city: "Hyderabad",
            offsetFromStartMinutes: 660,
            distanceFromStartKm: 570,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "MGBS Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "BLR-HYD-001",
      },

      // --------------------------------------------------
      // 7. Delhi -> Jaipur
      // --------------------------------------------------
      {
        operator: operatorMap.get("Rajdhani Roadways"),
        sourceCity: "Delhi",
        destinationCity: "Jaipur",
        totalDistanceKm: 280,
        totalDurationMinutes: 300,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Delhi",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Kashmere Gate ISBT",
          },
          {
            order: 2,
            city: "Gurugram",
            offsetFromStartMinutes: 45,
            distanceFromStartKm: 35,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "IFFCO Chowk",
          },
          {
            order: 3,
            city: "Neemrana",
            offsetFromStartMinutes: 120,
            distanceFromStartKm: 120,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Neemrana Bus Stop",
          },
          {
            order: 4,
            city: "Jaipur",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 280,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Sindhi Camp Bus Stand",
          },
        ],
        status: "ACTIVE",
        routeCode: "DEL-JAI-001",
      },

      // --------------------------------------------------
      // 8. Hyderabad -> Vijayawada
      // --------------------------------------------------
      {
        operator: operatorMap.get("Superfast Travels Co"),
        sourceCity: "Hyderabad",
        destinationCity: "Vijayawada",
        totalDistanceKm: 275,
        totalDurationMinutes: 300,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Hyderabad",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "MGBS Bus Station",
          },
          {
            order: 2,
            city: "Suryapet",
            offsetFromStartMinutes: 150,
            distanceFromStartKm: 140,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Suryapet Bus Stand",
          },
          {
            order: 3,
            city: "Vijayawada",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 275,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Pandit Nehru Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "HYD-VJA-001",
      },

      // --------------------------------------------------
      // 9. Kochi -> Trivandrum
      // --------------------------------------------------
      {
        operator: operatorMap.get("Comfort Ride Lines"),
        sourceCity: "Kochi",
        destinationCity: "Trivandrum",
        totalDistanceKm: 205,
        totalDurationMinutes: 300,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Kochi",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Vyttila Mobility Hub",
          },
          {
            order: 2,
            city: "Alappuzha",
            offsetFromStartMinutes: 90,
            distanceFromStartKm: 55,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Alappuzha KSRTC Stand",
          },
          {
            order: 3,
            city: "Kollam",
            offsetFromStartMinutes: 210,
            distanceFromStartKm: 145,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Kollam KSRTC Stand",
          },
          {
            order: 4,
            city: "Trivandrum",
            offsetFromStartMinutes: 300,
            distanceFromStartKm: 205,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Thampanoor Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "COK-TRV-001",
      },

      // --------------------------------------------------
      // 10. Mysore -> Bangalore
      // --------------------------------------------------
      {
        operator: operatorMap.get("Namma Travels"),
        sourceCity: "Mysore",
        destinationCity: "Bangalore",
        totalDistanceKm: 145,
        totalDurationMinutes: 180,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        stoppingPoints: [
          {
            order: 1,
            city: "Mysore",
            offsetFromStartMinutes: 0,
            distanceFromStartKm: 0,
            isBoardingPoint: true,
            isDroppingPoint: false,
            landmark: "Mysore Suburban Bus Stand",
          },
          {
            order: 2,
            city: "Mandya",
            offsetFromStartMinutes: 60,
            distanceFromStartKm: 45,
            isBoardingPoint: true,
            isDroppingPoint: true,
            landmark: "Mandya Bus Stand",
          },
          {
            order: 3,
            city: "Bangalore",
            offsetFromStartMinutes: 180,
            distanceFromStartKm: 145,
            isBoardingPoint: false,
            isDroppingPoint: true,
            landmark: "Kempegowda Bus Station",
          },
        ],
        status: "ACTIVE",
        routeCode: "MYS-BLR-001",
      },
    ];
    if(await Route.countDocuments() < 10){
        await Route.insertMany(routes);
        console.log("Routes added successfully!");
    }else{
        console.log("Already 10 Routes are added");
    }
    
  } catch (error) {
    console.error("Error seeding routes:", error);
  }
};

export default addRoutes;