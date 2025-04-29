const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    }
    catch (err) {
        return res.status(err.code || 500).json({
            success: false,
            message: err.message || "Something went wrong"
        })
    }
}

export default asyncHandler;