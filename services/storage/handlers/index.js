const fs = require("fs");
const { makeID } = require("../../../pkg/strings");

const DATA_SIZE = 437500;
const DATA_TYPE = ["image/jpeg", "image/png", "image/pjpeg", "image/gif"];

const upload = async (req, res) => {
  // console.log(req.files);
  // console.log(req);
  if (DATA_SIZE < req.files.File.size) {
    return res.status(400).send("File upload is too large");
  }

  if (!DATA_TYPE.includes(req.files.File.mimetype)) {
    return res.status(404).send("File type is not supported");
  }

  const userDirPath = `${__dirname}/../../../uploads`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }
  const fileName = `${req.files.File.name}`;
  const filePath = `${userDirPath}/${fileName}`;

  req.files.File.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    return res.status(201).send({ file_name: fileName });
  });
};
// const upload = async (req, res) => {
//   console.log(req.files);
//   if (DATA_SIZE < req.files.File.size) {
//     return res.status(400).send("File upload is too large");
//   }

//   if (!DATA_TYPE.includes(req.files.File.mimetype)) {
//     return res.status(404).send("File type is not supported");
//   }

//   const userDir = `user_${req.user.id}`;
//   const userDirPath = `${__dirname}/../../../uploads/${userDir}`;

//   if (!fs.existsSync(userDirPath)) {
//     fs.mkdirSync(userDirPath);
//   }
//   const fileName = `${makeID(6)}_${req.files.File.name}`;
//   const filePath = `${userDirPath}/${fileName}`;

//   req.files.File.mv(filePath, (err) => {
//     if (err) {
//       return res.status(500).send("Internal Server Error");
//     }
//     return res.status(201).send({ file_name: fileName });
//   });
// };

const download = async (req, res) => {
  const userDirPath = `${__dirname}/../../../uploads`;

  let filePath = `${userDirPath}/${req.params.filename}`;
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not foud");
  }
  res.download(filePath);
};

const listImages = async (req, res) => {
  try {
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../../../uploads`;
    let filePath = `${userDirPath}/${userDir}`;
    const files = fs.readdirSync(filePath);
    return res.status(200).send(files);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const listUsers = async (req, res) => {
  try {
    let userDirPath = `${__dirname}/../../../uploads`;
    const users = fs.readdirSync(userDirPath);
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    let userDir = `user_${req.user.id}`;
    let userDirPath = `${__dirname}/../../../uploads/${userDir}`;
    let filePath = `${userDirPath}/${req.params.filename}`;

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath);
      return res.status(204).send("");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  download,
  listImages,
  remove,
  listUsers,
};
