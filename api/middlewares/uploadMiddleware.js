const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadsFields = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);
module.exports = uploadsFields;
