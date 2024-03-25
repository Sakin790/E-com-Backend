import { validationResult } from "express-validator";
import { apiError } from "./utils/apiError.js";

const runValidation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return;
    } else {
      return next();
    }
  } catch (error) {
    return new apiError(422, "Error in validation");
  }
};

export { runValidation };
