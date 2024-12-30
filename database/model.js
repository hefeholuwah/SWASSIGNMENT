const mongoose = require("mongoose");

const AutobotSchema = new mongoose.Schema({
  apiId: Number,
  name: String,
  username: String,
  email: String,
  address: mongoose.Schema.Types.Mixed,
  phone: String,
  website: String,
  company: mongoose.Schema.Types.Mixed,
});

const PostSchema = new mongoose.Schema({
  apiId: Number,
  title: String,
  body: String,
  userId: {
    type: Number,
    ref: "Autobot",
    required: true,
  },
});

const CommentSchema = new mongoose.Schema({
  apiId: Number,
  name: String,
  email: String,
  body: String,
  postId: {
    type: Number,
    ref: "Post",
    required: true,
  },
});

const Autobot = mongoose.model("Autobot", AutobotSchema);
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Autobot, Post, Comment };