const express = require("express");
const mongoose = require("mongoose");  // Add mongoose import
const { Autobot, Post, Comment } = require("../database/model");
const rateLimit = require("express-rate-limit");
require("../documentation/swagger");

const router = express.Router();

// Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
});

router.use(limiter);

// Utility function to check if the ID is a valid ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id) && /^[a-fA-F0-9]{24}$/.test(id);
};

// Get Autobots
/**
 * @swagger
 * /autobots:
 *   get:
 *     summary: Retrieve a list of Autobots
 *     description: This endpoint retrieves a paginated list of Autobots.
 *     responses:
 *       200:
 *         description: A list of Autobots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autobot'
 */
router.get("/autobots", async (req, res) => {
  const page = parseInt(req.query.page || "1");
  const autobots = await Autobot.find().skip((page - 1) * 10).limit(10);
  res.json(autobots);
  console.log(autobots);
});

// Get Autobot's Posts
/**
 * @swagger
 * /autobots/{id}/posts:
 *   get:
 *     summary: Retrieve a list of posts for a specific Autobot
 *     description: This endpoint retrieves a paginated list of posts made by a specific Autobot.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Autobot whose posts are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of posts made by the specified Autobot
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
 router.get("/autobots/:id/posts", async (req, res) => {
  const page = parseInt(req.query.page || "1");
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  const posts = await Post.find({ userId })
    .skip((page - 1) * 10)
    .limit(10);
  res.json(posts);
});

// Get Post's Comments
/**
 * @swagger
 * /posts/{id}/comments:
 *   get:
 *     summary: Retrieve a list of comments for a specific post
 *     description: This endpoint retrieves a paginated list of comments made on a specific post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the post whose comments are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments made on the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
 router.get("/posts/:id/comments", async (req, res) => {
  const page = parseInt(req.query.page || "1");
  const postId = parseInt(req.params.id, 10);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid postId format" });
  }

  const comments = await Comment.find({ postId })
    .skip((page - 1) * 10)
    .limit(10);
  res.json(comments);
});

module.exports = router;
