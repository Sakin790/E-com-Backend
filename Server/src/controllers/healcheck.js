const healthcheck = (req, res) => {
  return res.status(200).json({
    message: "Server is Working ",
  });
};

export { healthcheck };
