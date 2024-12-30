const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Autobot API",
      version: "1.0.0",
      description: "API Documentation for the Autobot system",
    },
    components: {
      schemas: {
        Autobot: {
          type: "object",
          properties: {
            id: { type: "string", description: "Autobot ID", pattern: "^[a-fA-F0-9]{24}$", example: "60d21b4967d0d8992e610c85" },
            name: { type: "string", description: "Autobot's name", example: "Optimus Prime" },
            username: { type: "string", description: "Autobot's username", example: "prime123" },
            email: { type: "string", description: "Autobot's email", example: "optimus@autobot.com" },
            address: {
              type: "object",
              properties: {
                street: { type: "string", description: "Street address", example: "123 Cybertron Way" },
                city: { type: "string", description: "City", example: "Iacon" },
                zipcode: { type: "string", description: "ZIP code", example: "10101" },
              },
            },
            phone: { type: "string", description: "Autobot's phone number", example: "+1234567890" },
            website: { type: "string", description: "Autobot's website", example: "http://autobot.com" },
            company: {
              type: "object",
              properties: {
                name: { type: "string", description: "Company name", example: "Autobot Corp" },
                catchPhrase: { type: "string", description: "Company catchphrase", example: "Transform and Roll Out!" },
                bs: { type: "string", description: "Business specialization", example: "Cybernetic defense systems" },
              },
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            title: { type: "string", description: "Post title", example: "Battle Report" },
            body: { type: "string", description: "Post content", example: "We defended Cybertron successfully." },
            userId: { type: "string", description: "ID of the Autobot who created the post", pattern: "^[a-fA-F0-9]{24}$", example: "60d21b4967d0d8992e610c85" },
          },
        },
        Comment: {
          type: "object",
          properties: {
            name: { type: "string", description: "Commenter's name", example: "Bumblebee" },
            email: { type: "string", description: "Commenter's email", example: "bumblebee@autobot.com" },
            body: { type: "string", description: "Content of the comment", example: "Great job, Optimus!" },
            postId: { type: "string", description: "ID of the post the comment belongs to", pattern: "^[a-fA-F0-9]{24}$", example: "60d21b4967d0d8992e610c85" },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development Server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Pointing to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
