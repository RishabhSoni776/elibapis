import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";
const app = express();

app.get("/", (req, res, next) => {
  const error = createHttpError(400, "Something went wrong");
  throw error;
  res.json({
    message: "Welcome to elib apis",
  });
});

app.use(globalErrorHandler);
export default app;
