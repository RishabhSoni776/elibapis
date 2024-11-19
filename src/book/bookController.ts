import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  // Validation for required fields
  const { title, author, coverImage, description, file } = req.body; // getting the request body data or filled form data by the user
  if (!title || !author || !coverImage || !description || !file) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  res.json({ message: "create book" });
};

export { createBook };
