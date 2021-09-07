const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authVerify = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    console.log({ verifyToken });
    next();
  } catch (err) {
    // console.log({ err });
    res.status(400).json({ success: false, message: "Unauthorized User" });
  }
};

module.exports = { authVerify };
