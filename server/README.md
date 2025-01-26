Sure! Below is the updated documentation for your **SpeakX Full Stack Assignment**, reflecting the addition of type-based filtering for the search queries:

---

# SpeakX Full Stack Assignment: Comprehensive Project Documentation

The **SpeakX Full Stack Assignment** is a robust, gRPC-based search service designed for efficient handling of a questions database. It employs **Node.js**, **MongoDB**, and **Redis** for backend services, with gRPC for scalable and high-performance communication. This documentation covers the project structure, API endpoints, setup instructions, and additional details to ensure easy understanding and usage.

---

## Project Structure

```plaintext
project/
├── proto/
│   └── question.proto          # gRPC service definition
├── models/
│   └── question.model.js       # MongoDB schema for questions
├── controllers/
│   └── grpcServer.js           # gRPC server implementation
│   └── redisClient.js          # Redis connection and utilities
├── routes/
│   └── questionRoutes.js       # Express routes for HTTP API
├── config/
│   └── db.js                   # MongoDB connection setup
├── server/
│   └── index.js                # Main application entry point
├── package.json
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

---

## Features

- **Search Questions**: Query questions by title with advanced filtering by type and pagination.
- **Retrieve Question by ID**: Fetch detailed information about a specific question.
- **Autocomplete Suggestions**: Get dynamic suggestions based on query prefixes.
- **High Performance**: gRPC integration ensures low-latency communication.
- **Caching**: Redis integration for fast and efficient query resolution.
- **Extensibility**: Modular architecture allows easy addition of new features.

---

## API Endpoints

### 1. Search Questions by Query and Type
- **URL**: `/api/questions`
- **Method**: `GET`
- **Description**: Fetches a list of questions matching a search query, with support for type-based filtering, pagination, and configurable result limits.
- **Request Parameters**:
  - `query` (string): Search term to find matching questions (e.g., `toy`).
  - `page` (optional, number): Page number for pagination (default: 1).
  - `limit` (optional, number): Number of results per page (default: 10; maximum: 50).
  - `type` (optional, string or array): Filter by question types. Can be one or more types (e.g., `['MCQ', 'ANAGRAM']` or `MCQ`). Defaults to `all` to include all types.
- **Example Request**:
  ```plaintext
  http://localhost:5000/api/questions?query=toy&page=1&limit=50&type=MCQ
  ```
- **Response**:
  ```json
  {
    "success": true,
    "currentPage": 1,
    "totalPages": 3,
    "totalQuestions": 120,
    "questions": [
      { "_id": "101", "title": "Toy Cars for Kids", "type": "MCQ" },
      { "_id": "102", "title": "History of Toys", "type": "CONTENT_ONLY" },
      { "_id": "103", "title": "Best Toy Robots", "type": "ANAGRAM" }
    ]
  }
  ```
- **Error Responses**:
  - `404`: No questions found for the given query.
  - `400`: Invalid `page`, `limit`, or `type` parameter.
  - `500`: Internal server error.

### 2. Retrieve Question by ID
- **URL**: `/api/questionsById/:id`
- **Method**: `GET`
- **Description**: Retrieves the details of a single question by its ID.
- **Path Parameters**:
  - `id` (string): Unique identifier of the question.
- **Response**:
  ```json
  {
    "success": true,
    "question": {
      "_id": "123",
      "title": "Math Basics",
      "type": "MCQ",
      "options": [
        { "text": "Option A", "isCorrectAnswer": false },
        { "text": "Option B", "isCorrectAnswer": true }
      ],
      "solution": "Option B is correct."
    }
  }
  ```
- **Error Responses**:
  - `404`: Question not found.
  - `500`: Internal server error.

### 3. Autocomplete Suggestions
- **URL**: `/api/autocomplete`
- **Method**: `GET`
- **Description**: Provides autocomplete suggestions based on a query prefix.
- **Request Parameters**:
  - `query` (string): Prefix string to match question titles.
- **Response**:
  ```json
  {
    "success": true,
    "suggestions": ["Math Basics", "Math Geometry", "Math Algebra"]
  }
  ```
- **Error Responses**:
  - `404`: No suggestions found.
  - `500`: Internal server error.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Redis](https://redis.io/) (for caching autocomplete and search results)
- [Postman](https://www.postman.com/downloads/) (for testing the API)

### Steps to Set Up the Project

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/SpeakX.git
cd SpeakX/backend
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Variables
Create a `.env` file in the root directory and configure the following:
```plaintext
MONGO_URI=mongodb://localhost:27017/speakx
GRPC_SERVER_HOST=127.0.0.1
GRPC_SERVER_PORT=50051
PORT=5000
REDIS_URL=redis://localhost:6379
```

#### 4. Start the Application
Start both the gRPC and HTTP servers:
```bash
node server/index.js
```
The gRPC server will run on port `50051`, and the HTTP server will be accessible on port `5000`.

---

## Technologies Used

- **Node.js**: Backend server.
- **Express.js**: HTTP request handling.
- **MongoDB**: Database for persistent storage.
- **Redis**: In-memory data store for caching.
- **gRPC**: High-performance communication protocol.
- **Mongoose**: MongoDB ODM for schema management.
- **dotenv**: For managing environment variables.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## Summary

This comprehensive project offers a scalable, high-performance backend solution for managing and querying a questions database. The integration of Node.js, MongoDB, Redis, and gRPC ensures efficiency and reliability, while the well-structured folder organization facilitates maintainability and future development.

--- "# speakxBackend" 
"# speakxBackend" 
