import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // Validation

  //validation step 1 for required fields
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error); // passing error to globalErrorHandler throgh next(error)
  }

  //validation step 2 to find if user already exists
  // Database Call
  const user = await userModel.findOne({ email: email });

  if (user) {
    const error = createHttpError(400, "User already exists");
    return next(error);
  }
  // Process
  // Response

  res.json({ message: "User Created Successfully" });
};

export { createUser };
