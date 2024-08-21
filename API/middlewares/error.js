require("dotenv").config();

function errorHandler(error, req, res, next) {
    // Log the full error for debugging
    console.error('Error:', error);

    // Custom error handling
    if (error.custom) {
        return res.status(400).json(error);
    }

    // Unique constraint violation handling
    if (error.message && error.message.toLowerCase().includes("unique constraint failed")) {
        if (error.meta && error.meta.target) {
            return res.status(400).json({
                custom: true,
                message: `! ${error.meta.target.join(", ")}. Should be unique`,
                meta: error.meta.target
            });
        } else {
            return res.status(400).json({
                custom: true,
                message: "Unique constraint failed.",
            });
        }
    }

    // General error handling
    res.status(500).json({
        custom: true,
        message: "An unexpected error occurred. Please check the form and try again."
    });
}

module.exports = errorHandler;
