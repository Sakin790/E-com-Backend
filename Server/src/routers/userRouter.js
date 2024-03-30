import express from "express";

import {
  getUsers,
  getUser,
  deleteUserById,
  registerUser,
  healthcheck,
  seedUser,
  updateUserById,
  Login,
  logout,
} from "../controllers/userController.js";
import { upload } from "../middleware/multer.middleware.js";
import { validation } from "../utils/validation.js";
import { runValidation } from "../index.js";
import { isLoggedin } from "../middleware/auth.js";

const router = express.Router();
router.route("/healthCheck").get(healthcheck);
router.route("/seed").post(seedUser);
router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/delete/:id").delete(deleteUserById);
router
  .route("/register")
  .post(upload.single("image"), validation, runValidation, registerUser);

router.route("/update/:id").put(upload.single("image"), updateUserById);
router.route("/login").post(Login);
router.route("/logout").post(logout);
export { router };
