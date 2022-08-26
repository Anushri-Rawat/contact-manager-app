const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.email}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  return new AppError("Invalid token. Please log in again!", 401);
};
const handleJWTExpiredError = (err) => {
  return new AppError("Your token has expired! Please log in again.", 401);
};

const sendError = (err, res) => {
  res.status(err.statusCode || 500).json({
    status: err.status,
    err: err.name,
    message: err.message,
    strack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err, res);
  if (err.name === "JsonWebTokenError") err = handleJWTError(err);
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError(err);
  sendError(err, res);
};
