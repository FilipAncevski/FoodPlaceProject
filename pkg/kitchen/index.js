const mongoose = require("mongoose");

const Kitchen = mongoose.model(
  "kitchens",
  {
    recipeTitle: String,
    category: String,
    prepTime: Number,
    pplFor: Number,
    fabula: String,
    recipe: String,
    createdOn: Date,
  },
  "kitchens"
);

const createDish = async (dish) => {
  const d = new Kitchen(dish);
  return await d.save();
};

const update = async (id, dish) => {
  return await Kitchen.findByIdAndUpdate({ _id: id }, dish);
};

const getSingle = async (user_id, id) => {
  return await Kitchen.findOne({ user_id, _id: id });
};

const getAll = async (user_id) => {
  return await Kitchen.find({ user_id });
};

const remove = async (id) => {
  return await Kitchen.findByIdAndDelete({ _id: id });
};

module.exports = {
  createDish,
  update,
  getAll,
  getSingle,
  remove,
};
