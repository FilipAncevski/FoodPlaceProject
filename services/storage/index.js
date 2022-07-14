const config = require("../../pkg/config");
const express = require("express");
const fileUpload = require("express-fileupload");
const jwt = require("express-jwt");
const {
  download,
  listImages,
  remove,
  upload,
  listUsers,
} = require("./handlers");

const app = express();

app.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.get("security").jwt_key,
  }).unless({
    path: [/^\/api\/v1\/storage\/.*/],
  })
);
app.use(fileUpload());

app.post("/api/v1/storage", upload);
// app.get("/api/v1/storage", listImages);
app.get("/api/v1/storage/users", listUsers);
app.get("/api/v1/storage/:filename", download);
app.delete("/api/v1/storage/:filename", remove);

app.listen(config.get("services").storage.port, (err) => {
  if (err) return console.error(err);
  console.log(`Server listening on ${config.get("services").storage.port}`);
});
