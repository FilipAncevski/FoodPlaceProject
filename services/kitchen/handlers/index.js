const kitchen = require("../../../pkg/kitchen");
const {
  Kitchen,
  KitchenUpdate,
  validate,
} = require("../../../pkg/kitchen/validate");

const dateCreator = () => {
  return new Date().toISOString();
};

const getAll = async (req, res) => {
  try {
    let ps = await kitchen.getAll(req.user.id);
    return res.send(ps);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const getSingle = async (req, res) => {
  try {
    let ps = await kitchen.getSingle(req.user.id, req.params.id);
    if (!ps) {
      throw {
        code: 404,
        error: "Recipe not found",
      };
    }
    return res.send(ps);
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const create = async (req, res) => {
  try {
    await validate(req.body, Kitchen);
    let data = {
      ...req.body,
      user_id: req.user.id,
      createdOn: dateCreator(),
    };
    let ps = await kitchen.createDish(data);
    return res.status(201).send(ps);
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const update = async (req, res) => {
  try {
    await validate(req.body, Kitchen);
    let data = {
      ...req.body,
      user_id: req.user.id,
    };
    await kitchen.update(req.params.id, data);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const updatePartial = async (req, res) => {
  try {
    await validate(req.body, KitchenUpdate);
    let data = {
      ...req.body,
      user_id: req.user.id,
    };
    await kitchen.update(req.params.id, data);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const remove = async (req, res) => {
  try {
    await kitchen.remove(req.params.id);
    return res.status(204).send("");
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const getAllRecipies = async (req, res) => {
  try {
    let recipies = await kitchen.getAllRecipies();
    return res.status(200).send(recipies);
  } catch (error) {
    return res.status(error.code).send(error.error);
  }
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  updatePartial,
  remove,
  getAllRecipies,
};
