const { get } = require("../../pkg/config");
require("../../pkg/db");
const {
  create,
  getAll,
  getSingle,
  remove,
  update,
  updatePartial,
} = require("./handlers");
const express = require("express");
const jwt = require("express-jwt");

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(
  jwt({
    secret: get("security").jwt_key,
    algorithms: ["HS256"],
  })
);

api.get("/api/v1/kitchen", getAll);
api.get("/api/v1/kitchen/:id", getSingle);
api.post("/api/v1/kitchen", create);
api.delete("/api/v1/kitchen/:id", remove);
api.put("/api/v1/kitchen/:id", update);
api.patch("/api/v1/kitchen/:id", updatePartial);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

api.listen(get("services").kitchen.port, (err) => {
  if (err) return console.log(err);
  return console.log(`Server is live on port ${get("services").kitchen.port}`);
});
