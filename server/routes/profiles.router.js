const express = require('express');
const router = express.Router();
const pool = require("../modules/pool")

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profiles');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.sendStatus(500);
  }
});


router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO profiles (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting profile:', error);
    res.sendStatus(500);
  }
});


module.exports = router;
