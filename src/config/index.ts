/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  SQL_URL: process.env.SQL_URL,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SEED_PASSWORD: process.env.SEED_PASSWORD
};

const configIsAbsent = Object.entries(config)
  .map(([key, value]) => {
    if (key && value) {
      return { key, value };
    }
    if (!key) {
      console.log(`Missing key: ${key}`);
      console.error("Kindly Fix this Error");
      process.exit(1);
    }
    if (!value) {
      console.log(`Missing value for key: ${key}`);
      console.error("Kindly Fix this key Error");
      process.exit(1);
    }
  });

export default config;
