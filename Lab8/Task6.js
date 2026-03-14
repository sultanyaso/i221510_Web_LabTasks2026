const express = require("express");
const app = express();

app.use(express.json());

/* Resource availability (example values) */
let resources = {
  teamMembers: 5,
  vehicles: 2,
  equipment: 3
};

/* 1️⃣ Animal Type Check */
function animalTypeCheck(req, res, next) {
  const { animalType } = req.body;

  if (!animalType) {
    return next(new Error("Animal type is required"));
  }

  if (!["bird", "mammal", "reptile"].includes(animalType)) {
    return next(new Error("Invalid animal type"));
  }

  req.animalStrategy = `Handling ${animalType} rescue`;
  next();
}

/* 2️⃣ Severity Level Check */
function severityCheck(req, res, next) {
  const { severity } = req.body;

  if (!severity) {
    return next(new Error("Severity is required"));
  }

  if (!["mild", "moderate", "severe"].includes(severity)) {
    return next(new Error("Invalid severity level"));
  }

  req.severityLevel = severity;
  next();
}

/* 3️⃣ Resource Availability Check */
function resourceCheck(req, res, next) {

  if (
    resources.teamMembers < 2 ||
    resources.vehicles < 1 ||
    resources.equipment < 1
  ) {
    req.resourceStatus = "insufficient";
  } else {
    req.resourceStatus = "sufficient";
  }

  next();
}

/* 4️⃣ Mission Outcome Determination */
function determineOutcome(req, res, next) {

  let outcome;

  if (req.resourceStatus === "insufficient") {
    outcome = "unsuccessful";
  } 
  else if (req.severityLevel === "severe") {
    outcome = "delayed";
  } 
  else {
    outcome = "success";
  }

  req.missionOutcome = outcome;
  next();
}

/* Route */
app.post(
  "/rescue-mission",
  animalTypeCheck,
  severityCheck,
  resourceCheck,
  determineOutcome,
  (req, res) => {
    res.json({
      message: "Rescue mission processed",
      outcome: req.missionOutcome
    });
  }
);

/* 5️⃣ Error Handler */
function errorHandler(err, req, res, next) {
  res.status(400).json({
    error: err.message
  });
}

app.use(errorHandler);

/* Start server */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});