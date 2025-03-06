/**
 * @file server.js
 * @description Entry point for the HotelPennies API server.
 *              Initializes Express, connects to the database, and sets up routes.
 * @requires dotenv - Loads environment variables from a .env file.
 * @requires express - Web framework for handling requests.
 * @requires cors - Middleware for enabling Cross-Origin Resource Sharing.
 * @requires ./routes/userRoutes - User authentication and CRUD routes.
 * @requires ./database/db - Knex instance for database connection.
 */

require("dotenv").config();
const express = require("express");
const path = require('path');
const cors = require("cors");



// Importing the Knex instance to ensure the database is connected
//const db = require("./database/db");

// Importing routes
const userRoutes = require("./routes/userRoutes.js");
const pwResetRoutes = require('./routes/pwResetRoutes'); // Import pw routes
// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Allow requests from different origins (Vite's development server runs on a different port)
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL in production
    // methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.use("/api/users", userRoutes); // User authentication and CRUD routes
app.use('/api/password', pwResetRoutes); // Use auth routes
// Health check route
// app.get("/", (req, res) => {
//     res.send("HotelPennies API is running!");
// });


// Catch - All Route for serving the React app
// Uncomment before push

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
