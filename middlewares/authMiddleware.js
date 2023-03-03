const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split("")[1];
    console.log(req.body);
    console.log(token, "error");
    const decoded = jwt.verify(token, process.env.SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "invalid token" });
  }
};
