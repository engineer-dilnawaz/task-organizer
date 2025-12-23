require("dotenv").config();

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = {
  CONNECTION_STRING,
};
