const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Create Book
router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Books with Category Info
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().populate("categoryId", "name section");
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Book
router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Book
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;