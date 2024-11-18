const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const secret = process.env.JWT_SECRET;

const createPost = async (req, res) => {
  const { files, body } = req;

  //console.log("Files received:", req.files);
  //console.log("Body received:", req.body);

  try {
    // Procesar la portada
    const coverFile = files.cover ? files.cover[0] : null;
    let coverPath = null;
    if (coverFile) {
      const parts = coverFile.originalname.split(".");
      const ext = parts[parts.length - 1];
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      coverPath = `uploads/${uniqueName}`;
      fs.renameSync(coverFile.path, coverPath);
    }

    // Procesar imágenes de la descripción
    const imageFiles = files.images || [];
    const imagePaths = imageFiles.map((file) => {
      const parts = file.originalname.split(".");
      const ext = parts[parts.length - 1];
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
      const imagePath = `uploads/${uniqueName}`;
      fs.renameSync(file.path, imagePath);
      return imagePath; // Almacenar rutas de las imágenes
    });

    const { token } = req.cookies;
    const { title, summary, description, author } = req.body;
    // Validar campos obligatorios
    if (!title || !summary || !description) {
      return res.status(400).json("Missing required fields");
    }

    jwt.verify(token, secret, {}, async (err, userInfo) => {
      if (err) {
        return res.status(403).json("Invalid token");
      }

      try {
        // Crea el documento en la db
        const postDoc = await Post.create({
          title,
          summary,
          description,
          cover: coverPath,
          images: imagePaths,
          author: userInfo.id,
        });
        console.log("Post created:", postDoc);
        res.json(postDoc);
      } catch (dbError) {
        console.log("Database error:", dbError);
        res.status(500).json({ error: "Error creating post in database" });
      }
    });
  } catch (processingError) {
    console.error("Processing error:", processingError);
    res.status(500).json({ error: "Error processing request" });
  }
};

const getAllPost = async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

const updatePost = async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const ext = originalname.split(".").pop();
    newPath = `${path}.${ext}`;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const { id, title, summary, description } = req.body;

    // verificar post y autorizacion
    try {
      const postDoc = await Post.findById(id);

      if (!postDoc) return res.status(404).json({ message: "Post not found" });

      if (postDoc.author.toString() !== userInfo.id)
        return res.status(403).json({ message: "Unauthorized" });

      // actualizar el post
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.description = description;
      postDoc.cover = newPath || postDoc.cover;

      await postDoc.save();
      res.json(postDoc);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = { getAllPost, getPostById, createPost, updatePost };
