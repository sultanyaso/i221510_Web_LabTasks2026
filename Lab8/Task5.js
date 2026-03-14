const express = require("express");
const app = express();

// Middleware: addRequestTime
function addRequestTime(req, res, next) {
    // 1️⃣ Add property to request
    req.requestTime = new Date().toISOString();

    // Continue to next route
    next();
}

// Use middleware
app.use(addRequestTime);

// Route to show request time
app.get("/request-time", (req, res) => {
    res.send(`This request was received at: ${req.requestTime}`);
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});