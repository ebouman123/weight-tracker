const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profiles");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: "Missing 'name' in request body" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO profiles (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting profile:", error);
    res.sendStatus(500);
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query("DELETE FROM profiles WHERE id = $1;", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
