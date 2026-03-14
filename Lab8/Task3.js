const express = require("express");
const app = express();

// 1️⃣ Variable to store request count
let requestCount = 0;

// 2️⃣ Middleware: countRequests
function countRequests(req, res, next) {
    requestCount++;        // increment request count
    next();                // allow request to continue
}

// Use middleware for all routes
app.use(countRequests);

// Example route
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// 4️⃣ Stats Route
app.get("/stats", (req, res) => {
    res.send(`Total API Requests: ${requestCount}`);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});