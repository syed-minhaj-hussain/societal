const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authVerify = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifyToken);
    req.user = verifyToken;
    next();
  } catch (err) {
    console.log({ err });
    res.status(400).json({ success: false, message: "Unauthorized User" });
  }
};

module.exports = { authVerify };
