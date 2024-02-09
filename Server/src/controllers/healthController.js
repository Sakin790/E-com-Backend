

const healthCheck = (req, res, next) => {
  res.status(200).json({
    message: "Server is Health ..!",
  });
};

export { healthCheck };
