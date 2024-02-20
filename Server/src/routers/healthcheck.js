import express from "express";
import { healthcheck } from "../controllers/healcheck.js";

const healthCheck = express.Router();

healthCheck.get("/healthCheck", healthcheck);

export { healthCheck };
