const express = require("express");
const app = express();

app.use(express.json());

// Initial Data
let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin" },
  { id: 2, title: "Introduction to Algorithms", author: "CLRS" }
];


// 1️⃣ GET /books → View all books
app.get("/books", (req, res) => {
  res.json(books);
});


// 2️⃣ GET /books/:id → View single book
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  res.json(book);
});


// 3️⃣ POST /books → Add new book
app.post("/books", (req, res) => {
  const { id, title, author } = req.body;

  if (!id || !title || !author) {
    return res.status(400).send("Missing book data");
  }

  const newBook = { id, title, author };
  books.push(newBook);

  res.status(201).json(newBook);
});


// 4️⃣ PUT /books/:id → Update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send("Book not found");
  }

  const { title, author } = req.body;

  if (title) book.title = title;
  if (author) book.author = author;

  res.json({
    message: "Book updated",
    book
  });
});


// 5️⃣ DELETE /books/:id → Remove book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send("Book not found");
  }

  books.splice(index, 1);

  res.json({ message: "Book deleted successfully" });
});


// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});