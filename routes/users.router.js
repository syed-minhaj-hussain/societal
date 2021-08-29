const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const { authVerify } = require("../middlewares/authVerify");

router.put("/:_id", authVerify, async (req, res) => {
  const { _id } = req.params;
  const user = req.user;
  if (_id !== user._id) {
    return res
      .status(200)
      .json({
        success: false,
        message: "You Can't Update Other User's Credentials",
      });
  }
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.username) {
      const findUserByUsername = await User.findOne({
        username: req.body.username,
      });
      if (findUserByUsername) {
        return res
          .status(401)
          .json({ success: false, message: "Username ALready Exists" });
      }
    }

    if (req.body.email) {
      const findUserByEmail = await User.findOne({
        email: req.body.email,
      });
      if (findUserByEmail) {
        return res
          .status(401)
          .json({ success: false, message: "Email ALready Exists" });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong, Please Try Afetr Sometime",
    });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(user._id, {
      $set: req.body,
    });
    console.log("next");
    res
      .status(200)
      .json({ success: true, message: "User Updated Successfully" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong,",
    });
  }
});

module.exports = { router };
