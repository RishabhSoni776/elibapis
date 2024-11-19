import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
const app = express();

app.get("/", (req, res, next) => {
  throw new Error("Something went wrong");
  res.json({
    message: "Welcome to elib apis",
  });
});

app.use(globalErrorHandler);
export default app;
