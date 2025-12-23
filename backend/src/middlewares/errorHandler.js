const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.values(err.keyValue)[0];
    message = `Category with this name '${field}' already exists`;
    statusCode = 409; // Conflict
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
