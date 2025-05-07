const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const { profileId } = req.query;
  const queryText =
    "SELECT * FROM weights WHERE profile_id = $1 ORDER BY date ASC;";
  const params = [profileId];
  pool
    .query(queryText, params)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log("Error making GET for weights:", error);
      res.sendStatus(500);
    });
});

router.post("/", async (req, res) => {
  const { date, weight, profileId } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO weights (date, weight, profile_id) VALUES ($1, $2, $3) RETURNING *",
      [date, weight, profileId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting weight:", error);
    res.sendStatus(500);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;

  try {
    await pool.query("DELETE FROM weights WHERE id = $1;", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting weight entry:", error);
    res.sendStatus(500);
  }
});

module.exports = router;
