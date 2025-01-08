# Simple tweet api project

![Aubot backend implementation](https://github.com/user-attachments/assets/2cf471de-de10-489f-aa80-005f5ce8848b)


A Node.js and MongoDB-based backend project that provides RESTful APIs for managing Autobots, their posts, and related comments. This project implements paginated APIs with rate limiting and is designed to be easily extendable.

---

## Features

- **Autobot Management**: View a list of Autobots.
- **Post Management**: View posts associated with a specific Autobot.
- **Comment Management**: View comments associated with a specific post.
- **Pagination**: Supports paginated queries for efficient data retrieval.
- **Rate Limiting**: Prevents abuse by limiting the number of requests per minute.
- **Structured Codebase**: Well-organized MVC architecture for easy scalability and maintenance.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.17.1 or higher)
- [MongoDB](https://www.mongodb.com/)
- A package manager like npm or yarn

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/<your-database-name>
   ```

4. **Start the MongoDB server:**
   Ensure MongoDB is running locally or update the connection string to point to a remote instance.

5. **Run the server:**
   ```bash
   node server.js
   ```

6. **Access the application:**
   Open your browser or API testing tool (e.g., Postman) and navigate to:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Autobots

#### Get All Autobots (Paginated)
```http
GET /autobots?page=<page-number>
```
**Query Parameters:**
- `page`: The page number (default is `1`).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Optimus Prime",
    "username": "prime",
    "email": "prime@autobots.com",
    "address": {
      "street": "Cybertron St",
      "city": "Cyber City",
      "zipcode": "12345"
    },
    "phone": "123-456-7890",
    "website": "optimus.com",
    "company": {
      "name": "Autobot Inc."
    }
  }
]
```

### Posts

#### Get Posts by Autobot ID (Paginated)
```http
GET /autobots/:id/posts?page=<page-number>
```
**Path Parameters:**
- `id`: The ID of the Autobot.

**Query Parameters:**
- `page`: The page number (default is `1`).

**Response:**
```json
[
  {
    "title": "Autobot Leadership",
    "body": "Leading the Autobots to victory.",
    "userId": "64f8c9c0a1b2d3f4e5g6h7i8"
  }
]
```

### Comments

#### Get Comments by Post ID (Paginated)
```http
GET /posts/:id/comments?page=<page-number>
```
**Path Parameters:**
- `id`: The ID of the Post.

**Query Parameters:**
- `page`: The page number (default is `1`).

**Response:**
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "body": "Great leadership!",
    "postId": "64f8c9c0a1b2d3f4e5g6h7i8"
  }
]
```

---

## Project Structure

```
project-root
├── database
│   └── model.js       # MongoDB schemas and models
├── routes
│   └── routes.js      # API routes
├── server.js             # Main application entry point
└── package.json          # Project dependencies and scripts
```

---

## Built With

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for flexible and scalable data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Express Rate Limit**: Middleware for rate limiting API requests.

---

## Future Enhancements

- Add user authentication and authorization.
- Implement unit and integration tests.
- Extend APIs to support additional CRUD operations.
- Add support for Docker containers.
- Enhance documentation with API testing examples using tools like Postman.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---


