const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, max: 120 },
  password: { type: String, required: true },
  userImg: { type: String },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
