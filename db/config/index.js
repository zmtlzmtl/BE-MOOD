require("dotenv").config();
const development = {
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  database: process.env.DEV_DB_DATABASE,
  host: process.env.DEV_DB_HOST,
  dialect: process.env.DEV_DB_DIALECT,
};
module.exports = { development };
