import { validationResult } from "express-validator";
import { apiError } from "./utils/apiError.js";
const runValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()[0].msg,
      });
    } else {
      return next();
    }
  } catch (error) {
    return next(new apiError(422, "Error in validation"));
  }
};
export { runValidation };
