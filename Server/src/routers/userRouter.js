import express from "express";

import {
  getUsers,
  getUser,
  deleteUserById,
  registerUser,
  healthcheck,
  seedUser,
} from "../controllers/userController.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();
router.route("/healthCheck").get(healthcheck);
router.route("/seed").post(seedUser);
router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/delete/:id").delete(deleteUserById);
router.route("/register").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  
  ]),
  registerUser
);

export { router };
