const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  //console.log(userDoc);
  if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
    return res.status(400).json("wrong credentials");
  }

  const payload = {
    email,
    id: userDoc._id,
    username: userDoc.username,
  };

  jwt.sign(payload, secret, { expiresIn: "24h" }, (err, token) => {
    if (err) return res.status(500).json("Error generating token");
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      })
      .json({ email, id: userDoc._id, username: userDoc.username });
  });
};

exports.logout = (req, res) => {
  //res.cookie("token", "").json("");
  res.clearCookie("token");
  res.json("Logged out");
};

exports.getProfile = (req, res) => {
  const { token } = req.cookies;
  console.log("Token recibido en getProfile:", token);

  if (!token) {
    return res.status(401).json("Not authenticated");
  }

  jwt.verify(token, secret, {}, (err, userInfo) => {
    if (err) {
      console.log("Error de verificación de token:", err.message);
      return res.status(403).json("Invalid token");
    }

    console.log("Usuario autenticado:", userInfo);
    res.json(userInfo);
  });
};
