const cron = require("node-cron");
const axios = require("axios");
const { Autobot, Post, Comment } = require("../database/model");
const mongoose = require("mongoose");

// Function to fetch posts and create them in the database
async function fetchAndCreatePosts(userId, userName) {
  try {
    const posts = (await axios.get("https://jsonplaceholder.typicode.com/posts")).data;

    // Filter posts for the specific user
    const userPosts = posts.filter(post => post.userId === userId);

    for (const post of userPosts) {
      // Check if Post with apiId already exists
      const existingPost = await Post.findOne({ apiId: post.id });
      if (existingPost) {
        console.log(`Post already exists: ${post.title}`);
        continue;
      }

      const newPost = await Post.create({
        apiId: post.id,
        title: post.title,
        body: post.body,
        userId: userId,
      });

      console.log(`Post created: ${newPost.title}`);

      // Fetch and create comments for this post
      await fetchAndCreateComments(newPost.apiId, post.id);
    }
  } catch (error) {
    console.error("Error fetching and creating Posts:", error);
  }
}


async function fetchAndCreateComments(dbPostId, apiPostId) {
  try {
    // Fetch comments from the API
    const comments = (await axios.get("https://jsonplaceholder.typicode.com/comments")).data;

    // Filter comments for the specific post
    const postComments = comments.filter(comment => comment.postId === apiPostId);

    // Prepare new comments for insertion
    const newComments = postComments.map(comment => ({
      apiId: comment.id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
      postId: apiPostId,
    }));

    // Bulk insert comments
    await Comment.insertMany(newComments);

    console.log(`Comments created for postId ${apiPostId}`);
  } catch (error) {
    console.error("Error fetching and creating Comments:", error);
  }
}


// Function to create Autobots
async function createAutobots() {
  try {
    const users = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;

    for (const user of users) {
      try {
        // Check if Autobot with apiId already exists
        const existingAutobot = await Autobot.findOne({ apiId: user.id });
        if (existingAutobot) {
          console.log(`Autobot already exists: ${user.name}`);
          continue;
        }

        const autobot = await Autobot.create({
          apiId: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          website: user.website,
          company: user.company,
        });

        console.log(`Autobot created: ${autobot.name}`);

        // Fetch and create posts and comments for this Autobot
        await fetchAndCreatePosts(autobot.apiId, autobot.name);
      } catch (autobotError) {
        console.error("Error creating Autobot:", autobotError);
      }
    }

    console.log("Autobots, Posts, and Comments created successfully!");
  } catch (error) {
    console.error("Error in main loop:", error);
  }
}

// Schedule the task
cron.schedule("0 * * * *", async () => {
  // Check if the MongoDB connection is ready before running the task
  if (mongoose.connection.readyState === 1) {
    await createAutobots();
  } else {
    console.error("MongoDB is not connected. Retrying...");
  }
});
