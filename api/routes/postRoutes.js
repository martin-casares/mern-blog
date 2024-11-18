const express = require("express");
const {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
} = require("../controllers/postControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const uploadMiddleware = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/post", authMiddleware, uploadMiddleware, createPost);
router.put("/:id", authMiddleware, uploadMiddleware, updatePost);
router.get("/post", getAllPost);
router.get("/post/:id", getPostById);

module.exports = router;
