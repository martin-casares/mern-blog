const express = require("express");

const {
  getComments,
  createComment,
} = require("../controllers/commentsControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/:postId", getComments);
//router.post("/comments", delComment);

module.exports = router;
