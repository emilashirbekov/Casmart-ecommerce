const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const errorStatusCodes = {
    [constants.VALIDATION_ERROR]: "Validation Error",
    [constants.UNAUTHORIZED]: "Unauthorized",
    [constants.FORBIDDEN]: "Forbidden",
    [constants.NOT_FOUND]: "Not Found",
  };

  const statusCode = err.statusCode || constants.VALIDATION_ERROR;

  const errorMessage = errorStatusCodes[statusCode] || "Internal Server Error";

  res.status(statusCode).json({
    title: errorMessage,
    message: err.message,
    stackTrace: process.env.NODE_ENV === "production" ? "🤫" : err.stack,
  });
};

module.exports = errorHandler;
