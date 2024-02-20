import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import httpError from "http-errors";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import { userRouter } from "./routers/userRouter.js";
import { seedRouter } from "./routers/seedRouter.js";
import { healthCheck } from "./routers/healthcheck.js";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(rateLimit());

//
app.use("/api/users", userRouter); // http://localhost:8080/api/users/
app.use("/api/seed", seedRouter); // http://localhost:8080/api/seed/users
app.use("/api", healthCheck); // http://localhost:8080/api/healthCheck
app.use("/api/user", userRouter);
app.use("/api/delete", userRouter); // http://localhost:8080/api/delete/
app.use("/api/user", userRouter);

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: "To many request...!",
});

app.use(rateLimiter); // For Global use

//Client Side Error using httpError
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
