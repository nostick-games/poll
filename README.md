Polling App

Description

This Polling App allows users to create polls, vote on them, view poll results, and manage polls. The app supports functionalities like creating, updating, deleting polls, and preventing duplicate votes using cookies or IP-based identification.

Features

Create a new poll with a question and multiple options.

Submit a vote for a poll option.

Fetch the results of a specific poll.

Fetch the results of the most recently created poll.

Update poll details (question and options).

Delete a poll.

Prevent duplicate voting using cookies or IP.

Technologies Used

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Middleware: Cookie-parser, Body-parser

Environment Configuration: dotenv

Prerequisites

Node.js (v14 or higher)

MongoDB (local or hosted)

npm (Node Package Manager)

Installation

Clone the repository:

git clone <repository-url>
cd <repository-directory>

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory and add the following:

MONGO_URI=<your-mongodb-connection-string>
PORT=3000

Start the application:

npm start

Access the application at http://localhost:3000.

API Endpoints

Base URL: /api

Poll Management

Create Poll

URL: /polls

Method: POST

Request Body:

{
  "question": "Your poll question",
  "options": ["Option 1", "Option 2", "Option 3"]
}

Response:

{
  "message": "Poll created successfully.",
  "poll": {
    "_id": "...",
    "question": "...",
    "options": ["..."],
    "votes": [0, 0, 0]
  }
}

Submit Vote

URL: /submit-polls

Method: POST

Request Body:

{
  "pollId": "<poll-id>",
  "optionIndex": 0
}

Response:

"Vote submitted successfully."

Get Poll Results

URL: /polls/:pollId

Method: GET

Response:

{
  "question": "...",
  "options": ["..."],
  "votes": [0, 0, 0]
}

Get Last Poll Results

URL: /get-last-poll

Method: GET

Response:

{
  "question": "...",
  "options": ["..."],
  "votes": [0, 0, 0]
}

Delete Poll

URL: /polls/:id

Method: DELETE

Response:

{
  "message": "Poll deleted successfully."
}

Update Poll

URL: /polls/:id

Method: PUT

Request Body:

{
  "question": "Updated question",
  "options": ["Updated Option 1", "Updated Option 2"]
}

Response:

{
  "message": "Poll updated successfully.",
  "poll": {
    "_id": "...",
    "question": "...",
    "options": ["..."],
    "votes": [0, 0]
  }
}

Health Check

URL: /health

Method: GET

Response:

{
  "status": "OK",
  "uptime": 12345,
  "timestamp": "2024-01-01T00:00:00.000Z"
}

Project Structure

.
├── config
│   └── db.js          # MongoDB connection setup
├── controllers
│   └── pollController.js # Logic for poll-related operations
├── model
│   ├── poolSchema.js  # Poll schema definition
│   └── voteSchema.js  # Vote schema definition
├── routes
│   └── pollRoutes.js  # Route definitions for the poll APIs
├── .env               # Environment variables
├── server.js          # Entry point for the application
└── README.md          # Project documentation

Contributing

Fork the repository.

Create a new branch for your feature or bug fix.

Commit your changes and push them to your fork.

Create a pull request to the main repository.

License

This project is licensed under the MIT License.

