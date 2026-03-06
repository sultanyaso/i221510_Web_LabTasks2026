const express = require("express");

const app = express();
const PORT = 3000;

// Student array
const students = [
  { id: 1, name: "Ali", semester: 5 },
  { id: 2, name: "Yasir", semester: 3 },
  { id: 3, name: "Sana", semester: 6 },
  { id: 4, name: "Kashan", semester: 2 }
];

// Route: /students
app.get("/students", (req, res) => {

  const nameQuery = req.query.name;

  // If no query → return all students
  if (!nameQuery) {
    return res.json(students);
  }

  // Filter students by name
  const result = students.filter(
    student => student.name.toLowerCase() === nameQuery.toLowerCase()
  );

  // If no student found
  if (result.length === 0) {
    return res.send("No student found");
  }

  // Return matching students
  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});