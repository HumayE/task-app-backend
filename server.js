require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.listen(PORT)

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.post("/login", async (req, res) => {
  const { name } = req.body;

  const result = await pool.query(
    "INSERT INTO users(display_name) VALUES($1) RETURNING *",
    [name]
  );

  res.json(result.rows[0]);
});

app.post("/tasks", async (req, res) => {
  const { title, user_id } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks(title, user_id) VALUES($1, $2) RETURNING *",
    [title, user_id]
  );

  res.json(result.rows[0]);
});

app.get("/tasks/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1",
    [user_id]
  );

  res.json(result.rows);
});

app.listen(process.env.PORT, () => {
  console.log("Server running 🚀");
});