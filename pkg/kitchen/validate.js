const { Validator } = require("node-input-validator");

const Kitchen = {
  recipeTitle: "required|string",
  category: "required|string",
  prepTime: "required|integer",
  pplFor: "required|integer",
  fabula: "required|string",
  recipe: "required|string",
};

const KitchenUpdate = {
  recipeTitle: "string",
  category: "string",
  prepTime: "integer",
  pplFor: "integer",
  fabula: "string",
  recipe: "string",
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const c = await v.check();
  if (!c) {
    throw {
      code: 400,
      error: v.error,
    };
  }
};

module.exports = {
  Kitchen,
  KitchenUpdate,
  validate,
};
