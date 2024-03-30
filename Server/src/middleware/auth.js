import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

dotenv.config({
  path: "../config/.env",
});

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decode) {
      throw new apiError(401, "Invalid token , please login");
    }
    req.user = decode.user; // jekono somoy use korte parbo

    next();
  } catch (error) {
    console.log(error);
  }
};

const isloggedOut = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_ACTIVATION_KEY);
        if (decoded) {
          throw new apiError(400, "User already logged in");
        }
      }
    } catch (error) {
      throw new apiError(400, "Token hass been expiry");
    }
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new apiResponse(error.statusCode, error.message));
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access forbidden. Admin privileges required." });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

export { isAuthenticated, isloggedOut, isAdmin };
