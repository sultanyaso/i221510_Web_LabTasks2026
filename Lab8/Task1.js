// server.js

const express = require("express");
const app = express();

app.use(express.json());

// Initial Data
let courses = [
  { id: 1, name: "Data Structures", seats: 30 },
  { id: 2, name: "Operating Systems", seats: 25 }
];

// 1. View All Courses
app.get("/courses", (req, res) => {
  res.json(courses);
});

// 2. View Specific Course
app.get("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.json(course);
});

// 3. Add New Course
app.post("/courses", (req, res) => {
  const { id, name, seats } = req.body;

  if (!id || !name || !seats) {
    return res.status(400).send("Missing course data");
  }

  courses.push({ id, name, seats });

  res.status(201).json({
    message: "Course added successfully",
    course: { id, name, seats }
  });
});

// 4. Update Course Seats
app.put("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  if (!req.body.seats) {
    return res.status(400).send("Seats value required");
  }

  course.seats = req.body.seats;

  res.json({
    message: "Course seats updated",
    course
  });
});

// 5. Delete Course
app.delete("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).send("Course not found");
  }

  courses.splice(index, 1);

  res.json({ message: "Course deleted successfully" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});