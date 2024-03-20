import express from "express";

import {
  getUsers,
  getUser,
  deleteUserById,
  registerUser,
  healthcheck,
  seedUser
} from "../controllers/userController.js";

const router = express.Router();
router.route("/healthCheck").get(healthcheck);
router.route("/seed").post(seedUser);


router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id").delete(deleteUserById);
router.route("/register").post(registerUser);

export { router };
