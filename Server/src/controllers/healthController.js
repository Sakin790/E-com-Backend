

const healthCheck = (req, res, next) => {
  res.status(200).json({
    message: "Server is Health , Every think is working fine ..!",
  });
};

export { healthCheck };
