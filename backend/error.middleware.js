const errorMiddleware = (err, re1, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    if (err.code === 11000) {
      error = new Error("Email already Exists");
      error.statusCode = 400;
    }
    res
      .status(err.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
