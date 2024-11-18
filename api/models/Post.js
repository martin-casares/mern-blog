const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String },
    images: { type: [String], default: [] },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
);

const PostModel = model("Post", PostSchema);

module.exports = PostModel;
