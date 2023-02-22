//server setup
const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`node JS server is running ${port}`));
