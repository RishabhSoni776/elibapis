// import { NextFunction, Request, Response } from "express";
// import createHttpError from "http-errors";
// import userModel from "./userModel";
// import bcrypt from "bcrypt";
// import { sign } from "jsonwebtoken";
// import { config } from "../config/config";
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   // Validation

//   //validation step 1 for required fields
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     const error = createHttpError(400, "All fields are required");
//     return next(error); // passing error to globalErrorHandler throgh next(error)
//   }

//   //validation step 2 to find if user already exists
//   // Database Call
//   const user = await userModel.findOne({ email: email });

//   if (user) {
//     const error = createHttpError(400, "User already exists");
//     return next(error);
//   }

//   //password->hashing
//   //   const hashedPassword = await bcrypt.hash(password, 10);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await userModel.create({
//     name,
//     email,
//     password: hashedPassword,
//   });
//   // Process
//   // Token generation JWT
//   const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
//     expiresIn: "7d",
//   });
//   // Response
//   res.json({ accessToken: token });
//   res.json({ message: "User Created Successfully" });
// };

// export { createUser };

import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  const user = await userModel.findOne({ email: email });

  if (user) {
    const error = createHttpError(400, "User already exists");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
    expiresIn: "7d",
  });

  res.json({ accessToken: token });
  res.json({ message: "User Created Successfully" });
};

export { createUser };
