import express from "express";
import { createCategory } from "../controllers/category.js";



const categoryRouter = express.Router();

categoryRouter.route("/").post(createCategory);

export { categoryRouter };
