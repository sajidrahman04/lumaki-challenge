// src/middleware/error-handler.js

const NODE_ENVIRONMENT = process.env.NODE_ENV || "dev";

exports.errorHandler = (error, req, res, next) => {
    const errorCode = error.statusCode || 500;
	const errorMessage = error.message || "Internal Server Error";

	if(errorCode == 500){
		console.error(error);
	}

	const errorResponse = {
        success: false,
        message: undefined
	};

	// don't show message if in prod
	if (NODE_ENVIRONMENT !== "prod") {
		errorResponse.message = errorMessage;
    }

	res.status(errorCode).json(errorResponse);

	next();
}
