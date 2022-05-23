const { Validator } = require("node-input-validator");

const Profile = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|string",
  birthday: "required|dateiso",
  password: "required|string",
};

const ProfileLogin = {
  email: "required|string",
  password: "required|string",
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const c = await v.check();
  if (!c) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
};

module.exports = {
  Profile,
  ProfileLogin,
  validate,
};
