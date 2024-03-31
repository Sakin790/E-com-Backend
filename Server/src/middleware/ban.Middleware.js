const isBan = async (req, res, next) => {
  try {
    if (req.user?.isBan) {
      return res.status(403).json({ message: "Access forbidden. You R Ban" });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

export { isBan };
