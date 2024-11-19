import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";
import userRouter from "./user/userRouter";
const app = express();

app.get("/", (req, res, next) => {
  const error = createHttpError(400, "Something went wrong");
  throw error;
  res.json({
    message: "Welcome to elib apis",
  });
});

app.use("/api/users", userRouter);

// Global error Handler
app.use(globalErrorHandler);
export default app;
