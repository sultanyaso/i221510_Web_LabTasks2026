const express = require("express");
const app = express();

app.use(express.json());

/* Initial Astronaut Data */
let astronauts = [
  { name: "Ayesha Khan", specialization: "Pilot", skillLevel: "Advanced", assigned: false },
  { name: "Omar Malik", specialization: "Robotics Engineer", skillLevel: "Intermediate", assigned: false },
  { name: "Sara Ahmed", specialization: "Medical Officer", skillLevel: "Advanced", assigned: false },
  { name: "Ali Raza", specialization: "Engineer", skillLevel: "Beginner", assigned: false }
];

/* Missions Storage */
let missions = [];

/* Skill Level Score Mapping */
const skillScore = {
  Beginner: 10,
  Intermediate: 20,
  Advanced: 30
};

/* 1️⃣ GET /astronauts */
app.get("/astronauts", (req, res) => {
  const available = astronauts.filter(a => !a.assigned);
  res.json(available);
});

/* 2️⃣ POST /missions */
app.post("/missions", (req, res) => {
  const { missionName, crew } = req.body;

  if (!missionName || !crew) {
    return res.status(400).send("Mission name and crew are required");
  }

  let selectedCrew = [];
  let score = 0;

  for (let name of crew) {
    const astronaut = astronauts.find(a => a.name === name);

    if (!astronaut) {
      return res.status(404).send(`Astronaut ${name} not found`);
    }

    if (astronaut.assigned) {
      return res.status(400).send(`Astronaut ${name} already assigned to another mission`);
    }

    astronaut.assigned = true;
    selectedCrew.push(name);
    score += skillScore[astronaut.skillLevel];
  }

  const mission = {
    missionName,
    crew: selectedCrew,
    missionCapabilityScore: score
  };

  missions.push(mission);

  res.status(201).json(mission);
});

/* 3️⃣ GET /missions/:missionName */
app.get("/missions/:missionName", (req, res) => {
  const mission = missions.find(
    m => m.missionName === req.params.missionName
  );

  if (!mission) {
    return res.status(404).send("Mission not found");
  }

  res.json(mission);
});

/* 4️⃣ DELETE /missions/:missionName */
app.delete("/missions/:missionName", (req, res) => {
  const index = missions.findIndex(
    m => m.missionName === req.params.missionName
  );

  if (index === -1) {
    return res.status(404).send("Mission not found");
  }

  const mission = missions[index];

  // Make astronauts available again
  mission.crew.forEach(name => {
    const astronaut = astronauts.find(a => a.name === name);
    if (astronaut) astronaut.assigned = false;
  });

  missions.splice(index, 1);

  res.send(`Mission "${mission.missionName}" has been successfully cancelled.`);
});

/* Start Server */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});