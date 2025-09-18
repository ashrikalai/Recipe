const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  cuisine: String,
  title: String,
  rating: Number,
  prep_time: Number,
  cook_time: Number,
  total_time: Number,
  description: String,
  nutrients: Object,
  serves: String,
  ingredients: [String],
  instructions: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);
