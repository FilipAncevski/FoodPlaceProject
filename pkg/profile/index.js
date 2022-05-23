const mongoose = require("mongoose");

const Profile = mongoose.model(
  "profiles",
  {
    firstName: String,
    lastName: String,
    email: String,
    birthday: Date,
    password: String,
  },
  "profiles"
);

const createProfile = async (acc) => {
  const p = new Profile(acc);
  return await p.save();
};

const getProfileByID = async (id) => {
  return await Profile.findById({ _id: id });
};

const getProfileByEmail = async (email) => {
  return await Profile.findOne({ email });
};

const getAllProfile = async () => {
  return await Profile.find({});
};

const updateProfile = async (id, profile) => {
  return await Profile.findByIdAndUpdate({ _id: id }, profile);
};

const removeProfile = async (id) => {
  return await Profile.findByIdAndDelete({ _id: id });
};

module.exports = {
  createProfile,
  getAllProfile,
  getProfileByEmail,
  getProfileByID,
  updateProfile,
  removeProfile,
};
