const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register a new user
router.post("/register", async (req, res) => {
  try {
    //check if the user already exists
    console.log(req.body.email);
    const userExists =await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //save the user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Created user successfully",
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    //check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    //check the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Incorrect password",
      });
    }

    // create and assign a token
    // In the login we will get the email and password from the user ,if it is valid we need to 
    // create and send the jwt. why ? by this token we check if the user is logged in or not
    // 'sign' takes three parameters 1. data that you are encrypting , 2. secret key 3.validity of the token
    const token =  jwt.sign({userId:user._id},process.env.SECRET,{expiresIn:'1d'})
    res.send({success:true ,message : 'user loggedin successfully', data:token})
    // we send the token in the data and it stored in the local storage ,so after the login successful
    // it will send this token everytime for the protected routes
  } catch (error) {
    res.send({
      succes: false,
      message: error.message,
    });
  }
});

module.exports = router;
