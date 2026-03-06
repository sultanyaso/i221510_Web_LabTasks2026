const express = require("express");

const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: "Laptop", price: 900 },
  { id: 2, name: "Mouse", price: 20 },
  { id: 3, name: "Keyboard", price: 50 }
];

// Route 1: Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Route 2: Get product by id
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.send("Product not found");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});