const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const userUpload = require("../middlewares/userUpload");
//console.log(userUpload.single);

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/profile", authMiddleware, authController.getProfile);
// Ruta de actualización de perfil
router.put(
  "/updateProfile",
  authMiddleware,
  userUpload.single("userImg"),
  authController.updateProfile,
);

module.exports = router;
