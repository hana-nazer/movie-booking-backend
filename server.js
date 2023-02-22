//server setup
const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
//to get data from the frontend 
app.use(express.json())
const userRoute = require('./routes/userRouter')
app.use('/api/users',userRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`node JS server is running ${port}`));
