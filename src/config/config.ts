import { config as conf } from "dotenv";
conf();
const _config = {
  port: process.env.PORT,
  databaseurl: process.env.MONGOCONNECTIONSTRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinary_Cloud: process.env.CLOUDINARY_CLOUD,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
