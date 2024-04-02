import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(name);
    return res.status(200).json({
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createCategory };
