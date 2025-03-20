import mongoose from 'mongoose';

const busSchema = new mongoose.Schema(
    {
        busName: {type: String, required: true},
        boardingPoint: {type: String, required: true},
        droppingPoint: {type: String, required: true},
        stoppingPoint: [{type: String}],
        departureTime: {type: Date, required: true},
        arrivalTime: {type: Date, required: true},
        price: {type: Number, required: true},
        ratings: {type: Number},
        busType: {type: String, required: true},
        amentities: {type: [String]}

},{timestamps: true});

export const Bus = mongoose.model("Bus",busSchema)