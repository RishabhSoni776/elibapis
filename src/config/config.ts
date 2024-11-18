import { config as conf } from "dotenv";
conf();
const _config = {
  port: process.env.PORT,
  databaseurl: process.env.MONGOCONNECTIONSTRING,
};

export const config = Object.freeze(_config);
