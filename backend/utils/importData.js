const mongoose = require('mongoose');
const fs = require('fs');
const Recipe = require('../models/Recipe');
require('dotenv').config();

// Helper function to strip units like "kcal", "g", "mg", etc., and convert to float
const parseNutrient = (value) => {
  if (typeof value !== 'string') return null;
  const num = parseFloat(value.replace(/[^\d.]/g, ''));
  return isNaN(num) ? null : num;
};

// Load and clean JSON data
const rawData = JSON.parse(fs.readFileSync('./data/recipes.json', 'utf-8'));

const cleanedData = rawData.map(r => ({
  ...r,
  rating: isNaN(r.rating) ? null : r.rating,
  prep_time: isNaN(r.prep_time) ? null : r.prep_time,
  cook_time: isNaN(r.cook_time) ? null : r.cook_time,
  total_time: isNaN(r.total_time) ? null : r.total_time,
  nutrients: {
    calories: parseNutrient(r.nutrients?.calories),
    carbohydrateContent: parseNutrient(r.nutrients?.carbohydrateContent),
    cholesterolContent: parseNutrient(r.nutrients?.cholesterolContent),
    fiberContent: parseNutrient(r.nutrients?.fiberContent),
    proteinContent: parseNutrient(r.nutrients?.proteinContent),
    saturatedFatContent: parseNutrient(r.nutrients?.saturatedFatContent),
    sodiumContent: parseNutrient(r.nutrients?.sodiumContent),
    sugarContent: parseNutrient(r.nutrients?.sugarContent),
    fatContent: parseNutrient(r.nutrients?.fatContent),
    unsaturatedFatContent: parseNutrient(r.nutrients?.unsaturatedFatContent),
  }
}));

// Connect to DB and import
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Recipe.deleteMany();
    await Recipe.insertMany(cleanedData);
    console.log('Recipes imported successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Error importing recipes:', err);
    process.exit(1);
  });
