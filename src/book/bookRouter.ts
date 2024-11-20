import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: {
    fieldSize: 1e7, // 1e7 is arround 10mb not exact
    // fileSize: 3e7, // 3e7 is arround 30mb not exact
  },
});
//Routes

bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
