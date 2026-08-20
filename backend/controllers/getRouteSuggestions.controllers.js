import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Route } from "../models/route.models.js";

const getRouteSuggestions = asyncHandler(async (req, res) => {
    try {
        const { q = "", type = "both" } = req.query;
        const search = String(q).trim();

        if (!search) {
            return res.status(200).json(new ApiResponse(200, { suggestions: [] }, "Suggestions fetched successfully"));
        }

        const regex = new RegExp(search.replace(/[^a-zA-Z0-9\s]/g, "i"));

        let match = {};
        if (type === "boarding") {
            match = { sourceCity: { $regex: regex } };
        } else if (type === "destination") {
            match = { destinationCity: { $regex: regex } };
        } else {
            match = {
                $or: [{ sourceCity: { $regex: regex } }, { destinationCity: { $regex: regex } }],
            };
        }

        const matches = await Route.find(match, {
            sourceCity: 1,
            destinationCity: 1,
            _id: 0,
        })
            .limit(8)
            .lean();

        const suggestions = [...new Set(
            matches.flatMap((route) => {
                if (type === "boarding") return [route.sourceCity];
                if (type === "destination") return [route.destinationCity];
                return [route.sourceCity, route.destinationCity];
            })
        )].filter(Boolean);

        return res.status(200).json(new ApiResponse(200, { suggestions }, "Suggestions fetched successfully"));
    }
    catch (error) {
        throw new ApiError(500, "Error fetching route suggestions: " + error.message);
    }
});

export default getRouteSuggestions;