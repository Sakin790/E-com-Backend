import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import httpError from "http-errors";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import { router } from "./routers/healthcheck.js";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(rateLimit());

//
app.use("/api/users", router); // http://localhost:8080/api/users/

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: "To many request...!",
});

app.use(rateLimiter); // For Global use


app.use((req, res, next) => {
  httpError(404, "Route not found");
  next();
});

//ServerSide Error using httpError
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    sucess: false,
    message: err.message,
  });
});

export default app;
