import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary";
import path from "node:path";
// import { buffer } from "node:stream/consumers";
import bookModel from "./bookModel";
import fs from "node:fs";
import { AuthRequest } from "../middlewares/authenticate";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);
  const { title, description } = req.body;
  console.log("title", title, "description", description);
  if (!title || !description) {
    console.log("title", title, "description", description);
    throw createHttpError(
      400,
      "All fields (title, author, description) are required."
    );
  }

  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

    const fileName = files.coverImage[0].filename;

    // const filePath = files.coverImage[0].buffer;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    console.log("uploadResult", uploadResult);

    const bookMimeType = files.file[0].mimetype.split("/").at(-1);

    const bookFileName = files.file[0].filename;

    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
      resource_type: "raw",
      filename_override: bookFileName,
      folder: "books-pdf",
      format: bookMimeType,
    });

    console.log("bookUploadResult", bookUploadResult);
    //@ts-ignore
    console.log("userId", req.userId);

    const _req = req as AuthRequest;
    const newBook = await bookModel.create({
      title,
      author: _req.userId,
      description,
      coverImage: uploadResult.secure_url,
      file: bookUploadResult.secure_url,
    });

    // Delete Temporary files
    try {
      await fs.promises.access(filePath);
      await fs.promises.unlink(filePath);

      await fs.promises.access(bookFilePath);
      await fs.promises.unlink(bookFilePath);
      console.log("filepath", filePath, "bookfilepath", bookFilePath);
    } catch (error) {
      console.error("Error during file deletion:", error);
      return next(createHttpError(500, `Error while deleting files:`));
    }

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log("error", error);
    return next(createHttpError(500, "Error while uploading book"));
  }
};

export { createBook };
