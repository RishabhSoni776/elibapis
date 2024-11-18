import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
import globalErrorHandler from "./middleWares/globalErrorHandlers";

const app = express();

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use(globalErrorHandler);

export default app;
