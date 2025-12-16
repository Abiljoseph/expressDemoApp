
// CommonJS export so `require()` works across the project
module.exports = function errorHandler(err, req, res, next) {
    // Log the full error for debugging (can be adjusted for prod)
    console.error("Error:", err);

    const statusCode = err && err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: (err && err.message) || "Internal Server Error"
    });
};