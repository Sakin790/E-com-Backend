import express from "express";
import { getUsers, getUser, deleteUserById } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUserById)

export { userRouter };
