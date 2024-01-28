import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import createHttpError from "http-errors";
import route from "./routes/index.routes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Server is running",
  });
});
app.use('/api', route)
app.use("*", (req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    status: error.status || 500,
    message: error.message,
  });
});

export default app