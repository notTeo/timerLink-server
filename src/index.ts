import express from "express";
import mongoose from "mongoose";
import * as errorMiddleware from "./middleware/error.middleware";
import * as logMiddleware from "./middleware/log.middleware";
import userRouter from "./routes/user/user.router";
import cors from "cors";
import bodyParser from "body-parser";
import { sendErrorResponse } from "./utils/responses";
require("dotenv/config");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("[server]: DB Connected!"))
  .catch((err) => console.log(err));

const app = express();
const PORT: number = parseInt(process.env.PORT || "4000");

app.use(logMiddleware.logRequest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", userRouter);

app.use("*", errorMiddleware.notFoundHandler);
app.use(errorMiddleware.genericErrorHandler);

app.listen(PORT, () =>
  console.log(`[server]: Server is running at  http://localhost:${PORT}`)
);

// router: responsible for setting up the path and orchestrating the actions to take each time the path is called
// controller: responsbile for responding to the request
// service: responsible for handling domain specific logic

//peding updaet user validation and many more