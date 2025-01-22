require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import CORS middleware
const pollRoutes = require("./routes/pollRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: ["https://nostick.ghost.io", "https://www.nostick.fr"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Connect to MongoDB
connectDB();

// Define routes
app.use("/api", pollRoutes);

app.get("/health", (req, res) => {
  res.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'application Poll System !");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
