import { Operator } from '../models/operator.js';

async function addOperator() {
    try {
        const operators = [
            {
                name: "Orange Travels",
                contactEmail: "contact@orangetravels.com",
                contactPhone: "9876543210",
                gstNumber: "29ABCDE1234F1Z5",
                averageRating: 4.7,
                ratingCount: 4821,
                status: "ACTIVE",
            },
            {
                name: "VRL Travels",
                contactEmail: "support@vrltravels.com",
                contactPhone: "9876543211",
                gstNumber: "29BCDEF2345G1Z6",
                averageRating: 4.5,
                ratingCount: 3960,
                status: "ACTIVE",
            },
            {
                name: "SRS Travels",
                contactEmail: "info@srstravels.com",
                contactPhone: "9876543212",
                gstNumber: "29CDEFG3456H1Z7",
                averageRating: 4.3,
                ratingCount: 2847,
                status: "ACTIVE",
            },
            {
                name: "Kallada Travels",
                contactEmail: "booking@kalladatravels.com",
                contactPhone: "9876543213",
                gstNumber: "32DEFGH4567J1Z8",
                averageRating: 4.6,
                ratingCount: 3210,
                status: "ACTIVE",
            },
            {
                name: "Parveen Travels",
                contactEmail: "contact@parveentravels.com",
                contactPhone: "9876543214",
                gstNumber: "33EFGHI5678K1Z9",
                averageRating: 4.2,
                ratingCount: 2478,
                status: "ACTIVE",
            },
            {
                name: "GreenLine Travels",
                contactEmail: "support@greenlinetravels.com",
                contactPhone: "9876543215",
                gstNumber: "36FGHIJ6789L1Z0",
                averageRating: 4.8,
                ratingCount: 5124,
                status: "ACTIVE",
            },
            {
                name: "Morning Star Travels",
                contactEmail: "info@morningstartravels.com",
                contactPhone: "9876543216",
                gstNumber: "29GHIJK7890M1Z1",
                averageRating: 3.9,
                ratingCount: 1178,
                status: "INACTIVE",
            },
            {
                name: "Yolo Bus",
                contactEmail: "hello@yolobus.com",
                contactPhone: "9876543217",
                gstNumber: "27HIJKL8901N1Z2",
                averageRating: 4.4,
                ratingCount: 2895,
                status: "ACTIVE",
            },
            {
                name: "IntrCity SmartBus",
                contactEmail: "support@intrcity.com",
                contactPhone: "9876543218",
                gstNumber: "07IJKLM9012P1Z3",
                averageRating: 4.6,
                ratingCount: 4382,
                status: "ACTIVE",
            },
            {
                name: "Royal Cruiser",
                contactEmail: "contact@royalcruiser.com",
                contactPhone: "9876543219",
                gstNumber: "37JKLMN0123Q1Z4",
                averageRating: 3.8,
                ratingCount: 986,
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