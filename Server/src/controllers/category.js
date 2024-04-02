import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import slugify from "slugify";
import { Category } from "../model/categoryModel.js";


const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    console.log(slug);

    const newCategory = await Category.create({
      name,
      slug,
    });

    return res.status(200).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export { createCategory };
