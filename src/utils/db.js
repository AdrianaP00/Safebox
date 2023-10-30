const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const DB_URL = process.env.DB_URL;

const connect = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    const { name, host } = db.connection;

    console.log(`Connection to ${name} DB in host : ${host}`);
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

module.exports = { connect };
