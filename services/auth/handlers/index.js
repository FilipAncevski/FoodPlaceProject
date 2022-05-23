const {
  validate,
  Profile,
  ProfileLogin,
} = require("../../../pkg/profile/validate");
const profile = require("../../../pkg/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../pkg/config");

const register = async (req, res) => {
  try {
    await validate(req.body, Profile);
    let exists = await profile.getProfileByEmail(req.body.email);
    if (exists) {
      throw {
        code: 400,
        error: "Account exists",
      };
    }
    req.body.password = bcrypt.hashSync(req.body.password);
    let prof = await profile.createProfile(req.body);
    return res.status(201).send(prof);
  } catch (err) {
    console.log(err);
    return res.status(err.code).send(err.error);
  }
};

const login = async (req, res) => {
  try {
    await validate(req.body, ProfileLogin);
    let prof = await profile.getProfileByEmail(req.body.email);
    if (!prof) {
      throw {
        code: 404,
        error: "Account not found",
      };
    }
    if (!bcrypt.compareSync(req.body.password, prof.password)) {
      throw {
        code: 400,
        error: "Wrong password",
      };
    }
    let payload = {
      full_name: prof.full_name,
      email: prof.email,
      id: prof._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    let token = jwt.sign(payload, config.get("security").jwt_key);
    return res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.error);
  }
};

const refreshToken = async (req, res) => {
  let payload = {
    ...req.user,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };
  let token = jwt.sign(payload, config.get("security").jwt_key);
  return res.send({ token });
};

const forgotPassword = async (req, res) => {
  return res.send("OK");
};

const resetPassword = async (req, res) => {
  return res.send("OK");
};

module.exports = {
  login,
  register,
  refreshToken,
  forgotPassword,
  resetPassword,
};
