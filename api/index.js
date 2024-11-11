const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET;
const mongoUri = process.env.MONGODB_URI;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(mongoUri);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    return res.status(400).json("wrong credentials");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ email, id: userDoc._id });
    });
  } else {
    res.status(400).json("worng credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, secret, {}, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    res.json(userInfo);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const { title, summary, description, author } = req.body;
    // Crea el documento en la db
    const postDoc = await Post.create({
      title,
      summary,
      description,
      cover: newPath,
      author: userInfo.id,
    });

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, userInfo) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }

    const { id, title, summary, description } = req.body;
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json("Post not found");
    }

    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(userInfo.id);

    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        description,
        cover: newPath ? newPath : postDoc.cover,
      },
      { new: true },
    ); // Esto devuelve el documento actualizado en `updatedPost`

    res.json(updatePost);
  });
});

app.listen(4000);
