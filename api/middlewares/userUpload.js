const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtro para tipos de archivo permitidos
const userFileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
  }
};

// Configuración de multer
const userUpload = multer({
  storage: userStorage,
  fileFilter: userFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // Máximo 2 MB
});

module.exports = userUpload; // Exportar el objeto multer
