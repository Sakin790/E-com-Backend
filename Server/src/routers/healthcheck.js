import express from "express";
import { healthcheck } from "../controllers/healcheck.js";

const router = express.Router();

router.route("/healthCheck").get(healthcheck);

export { router };
