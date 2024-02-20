import express from "express";
import { getUsers, getUser } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

export { userRouter };
