const config = require("../../pkg/config");
require("../../pkg/db");

const express = require("express");
const jwt = require("express-jwt");
const {
  forgotPassword,
  login,
  refreshToken,
  register,
  resetPassword,
} = require("./handlers");

const api = express();

api.use(express.json());
api.use(
  jwt({
    secret: config.get("security").jwt_key,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/forgot-password",
      "/api/v1/auth/reset-password",
    ],
  })
);

api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.get("/api/v1/auth/refresh-token", refreshToken);
api.post("/api/v1/auth/forgot-password", forgotPassword);
api.post("/api/v1/auth/reset-password", resetPassword);

api.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  }
});

api.listen(config.get("services").auth.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.get("services").auth.port}`);
});
