import { Operator } from '../models/operator.models.js';

async function addOperator() {
    try {
        const operators = [
            {
                name: "Sundar Express",
                contactEmail: "info@sundarexpress.com",
                contactPhone: "9123456780",
                gstNumber: "27AAAAA1111A1Z5",
                averageRating: 4.4,
                ratingCount: 3650,
                status: "ACTIVE",
            },
            {
                name: "Blue Mountain Travels",
                contactEmail: "support@bluemountain.com",
                contactPhone: "9123456781",
                gstNumber: "27BBBBB2222B1Z6",
                averageRating: 4.1,
                ratingCount: 2180,
                status: "ACTIVE",
            },
            {
                name: "Royal Coach Lines",
                contactEmail: "bookings@royalcoach.com",
                contactPhone: "9123456782",
                gstNumber: "29CCCCC3333C1Z7",
                averageRating: 4.6,
                ratingCount: 5420,
                status: "ACTIVE",
            },
            {
                name: "Green Valley Transit",
                contactEmail: "hello@greenvalley.com",
                contactPhone: "9123456783",
                gstNumber: "33DDDDD4444D1Z8",
                averageRating: 3.9,
                ratingCount: 1540,
                status: "ACTIVE",
            },
            {
                name: "Golden Chariot Travels",
                contactEmail: "info@goldenchariot.com",
                contactPhone: "9123456784",
                gstNumber: "29EEEEE5555E1Z9",
                averageRating: 4.3,
                ratingCount: 2890,
                status: "ACTIVE",
            },
            {
                name: "Silver Line Express",
                contactEmail: "support@silverline.com",
                contactPhone: "9123456785",
                gstNumber: "36FFFFF6666F1Z0",
                averageRating: 4.0,
                ratingCount: 1760,
                status: "ACTIVE",
            },
            {
                name: "Rajdhani Roadways",
                contactEmail: "contact@rajdhani.com",
                contactPhone: "9123456786",
                gstNumber: "29GGGGG7777G1Z1",
                averageRating: 4.5,
                ratingCount: 4100,
                status: "ACTIVE",
            },
            {
                name: "Superfast Travels Co",
                contactEmail: "bookings@superfast.com",
                contactPhone: "9123456787",
                gstNumber: "07HHHHH8888H1Z2",
                averageRating: 3.7,
                ratingCount: 980,
                status: "INACTIVE",
            },
            {
                name: "Comfort Ride Lines",
                contactEmail: "hello@comfortride.com",
                contactPhone: "9123456788",
                gstNumber: "37IIIII9999I1Z3",
                averageRating: 4.2,
                ratingCount: 3200,
                status: "ACTIVE",
            },
            {
                name: "Namma Travels",
                contactEmail: "info@nammatravels.com",
                contactPhone: "9123456789",
                gstNumber: "29JJJJJ0000J1Z4",
                averageRating: 3.5,
                ratingCount: 650,
                status: "SUSPENDED",
            },
        ];
        if(await Operator.countDocuments() <= 10){
            const response = await Operator.insertMany(operators);
            if(response){
                console.log('Operators added successfully');
            }
        }else{
            console.log("Operators already exist. Skipping insertion");
            return;
        }
    }
    catch (error) {
        console.error("Error adding operators:", error.message);
    }
}

export default addOperator;
