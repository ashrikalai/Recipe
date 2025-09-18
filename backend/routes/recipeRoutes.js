const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes with pagination and sorting
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const recipes = await Recipe.find()
    .sort({ rating: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ page, limit, data: recipes });
});

// GET search
router.get('/search', async (req, res) => {
  let query = {};

  if (req.query.title) query.title = { $regex: req.query.title, $options: 'i' };
  if (req.query.cuisine) query.cuisine = { $regex: req.query.cuisine, $options: 'i' };
  if (req.query.rating) query.rating = { $gte: parseFloat(req.query.rating) };
  if (req.query.calories) query['nutrients.calories'] = { $lte: parseFloat(req.query.calories) };

  const results = await Recipe.find(query);
  if (results.length === 0) {
    return res.status(404).json({ message: 'No recipes matched your filters!' });
  }

  res.json({ data: results });
});

module.exports = router;
