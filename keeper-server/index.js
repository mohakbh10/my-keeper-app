const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get("/notes", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

app.post("/notes", async (req, res) => {
    const { title, content } = req.body;

    try {
        const result = await pool.query(
        "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
        [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error inserting note:", err);
        res.status(500).json({ error: "Failed to add note" });
    }
});

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM notes WHERE id = $1", [id]);
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({ error: "Failed to delete note" });
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});