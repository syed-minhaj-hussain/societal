const jwt = require("jsonwebtoken");
require("dotenv").config();
const authVerify = (req, res, next) => {
  console.log("req:", req.originalUrl);
  const token = req.headers.authorization;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({ decoded });
    // req.user = decoded;
    return next();
  } catch (err) {
    console.log({ err });
    res.status(401).json({ success: false, message: "Unauthorized User!" });
  }
};

module.exports = { authVerify };
