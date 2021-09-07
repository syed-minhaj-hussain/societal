const express = require("express");
const { Post } = require("../models/post.model");
const extractPostByPostId = async (req, res, next, postId) => {
  try {
    console.log("middleware", { postId });
    const getPost = await Post.findById(postId);
    if (!getPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }
    req.getPost = getPost;
    return next();
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { extractPostByPostId };
