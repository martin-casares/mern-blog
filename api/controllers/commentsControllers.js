const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const jwt = require("jsonwebtoken");
const { secret } = process.env.JWT_SECRET;

const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const userInfo = req.user;

  try {
    const comment = await Comment.create({
      content,
      author: userInfo.id,
      post: postId,
    });

    res.json(comment);
  } catch (error) {
    res.status(500).json("Error creating comment");
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json("Error fetching comments");
  }
};

module.exports = { createComment, getComments };
