import express from "express";
import pool from "./db.js";

const app = express();

const tasks = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.get("/api/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");

  res.json(result.rows);
});

app.get("/api/tasks/:id", (req, res) => {

  res.json({
    message: "Task requested",
    id: req.params.id,
  });
});

app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
    [title, description]
  );

  res.status(201).json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});