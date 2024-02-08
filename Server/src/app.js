import express from "express";
import morgan from "morgan";
import bodyPaeser from "body-parser";
import httpError from "http-errors";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";

const app = express();
app.use(morgan("dev"));
app.use(bodyPaeser.json());
app.use(bodyPaeser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(rateLimit());

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  message: "To many request...!",
});

app.use(rateLimiter); // For Global use
app.get("/test", (req, res) => {
  res.status(200).send({
    message: `Server is Working is Properly...! `,
  });
});

app.get("/api/profile", (req, res) => {
  res.status(200).send({
    message: `User Profile is Returned...! `,
  });
});
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
