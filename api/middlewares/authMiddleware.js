const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    //    console.log("auth: Token no encontrado");
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) {
      //    console.log("auth:Error de token:", err.message);
      return res.status(403).json("Invalid token");
    }
    // console.log("auth:Token valido, usuario:", userInfo);
    req.user = userInfo;

    next();
  });
}

module.exports = authMiddleware;
