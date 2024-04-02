import express from "express";
import { createCategory } from "../controllers/category.js";
import { categoryValidation } from "../utils/categoryValidation.js";
import { runValidation } from "../index.js";
import { isLoggedIn } from "../middleware/auth.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(isLoggedIn, categoryValidation, runValidation, createCategory);

export { categoryRouter };
