import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import { router } from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import { categoryRouter } from "./routers/categoryRouter.js";

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xssClean());
app.use(rateLimit());
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 10000,
  limit: 10,
  message: "To many request...!",
});
app.use(rateLimiter);
app.use(cookieParser());

//UserRouter routes
app.use("/api/users", router);

//Category routes
app.use("/api/category", categoryRouter);

export default app;
