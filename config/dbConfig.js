const { Db } = require("mongodb");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connect mongoose with the object
mongoose.connect(process.env. mongo_url);

// connection object
const connection = mongoose.connection;

// verify connection
connection.on("connected", () => {
  console.log("DB connection successfull");
});
connection.on("error", () => {
  console.log("error in DB connection");
});

