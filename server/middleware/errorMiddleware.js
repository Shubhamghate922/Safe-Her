/**
 * Express Request & Response Error Handlers
 */

// Handle 404 Route Not Found
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route Not Found - [${req.method}] ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Express Error Handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'MongoDB Resource not found. Invalid BSON ObjectId format.';
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for '${key}': ${err.keyValue[key]}`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    requestInfo: {
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      timestamp: new Date().toISOString(),
    },
  });
};
