const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const routes = require("./routes/routes");
const { Autobot } = require("./database/model"); // Import only what you need
require("dotenv").config();
require("./process/cron");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./documentation/swagger"); // Importing the swaggerSpec from documentation folder

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI route

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
  app.use("/api", routes); // Mount routes after DB connection
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Real-Time Autobot Count (Socket.IO)
io.on("connection", (socket) => {
  console.log("Client connected");

  const interval = setInterval(async () => {
    try {
      const count = await Autobot.countDocuments();
      socket.emit("autobotCount", count);
    } catch (error) {
      console.error("Error fetching Autobot count:", error);
    }
  }, 1000);

  socket.on("disconnect", () => clearInterval(interval));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
