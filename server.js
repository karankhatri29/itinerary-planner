import express from "express";
import path from "path";

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "/index.html")));

// Define routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
