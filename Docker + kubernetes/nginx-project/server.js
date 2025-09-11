const express = require("express"); // Import the Express.js library
const app = express(); // Create an Express application instance
const port = process.env.PORT || 3000; // Define the port, defaulting to 3000

// Optional: Add middleware for parsing JSON request bodies
app.use(express.json());
const server = process.env.SERVER || "localhost";

// Define a basic route for the root path
app.get("/", (req, res) => {
  console.log(`API call made from ${server}`);
  res.send(`API call made from - ${server}`); // Send a response when the root path is accessed
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server listening on port ${port}`); // Log a message indicating the server is running
});
