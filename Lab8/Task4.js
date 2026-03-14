const express = require("express");
const app = express();

app.use(express.json());

// Middleware: validateMission
function validateMission(req, res, next) {

    const { missionName, crew } = req.body;

    // Check required fields
    if (!missionName || !crew) {
        return res.status(400).send("Invalid Request: Required fields missing");
    }

    // If valid, continue to route
    next();
}

// POST /missions route with middleware
app.post("/missions", validateMission, (req, res) => {

    const { missionName, crew } = req.body;

    res.json({
        message: "Mission created successfully",
        missionName: missionName,
        crew: crew
    });

});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});