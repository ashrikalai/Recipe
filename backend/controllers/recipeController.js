const Recipe = require('../models/Recipe');

exports.searchRecipes = async (req, res) => {
  try {
    const { title, cuisine, rating, calories } = req.query;
    const query = {};

    if (title) query.title = new RegExp(title, 'i');
    if (cuisine) query.cuisine = new RegExp(cuisine, 'i');
    if (rating) query.rating = { $gte: parseFloat(rating) };
    if (calories) query['nutrients.calories'] = { $lte: parseFloat(calories) };

    const recipes = await Recipe.find(query);
    res.json({ data: recipes });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
