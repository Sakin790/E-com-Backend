import express from "express";
import {
  getUsers,
  getUser,
  deleteUserById,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUserById);
userRouter.post("/register", registerUser)

export { userRouter };
