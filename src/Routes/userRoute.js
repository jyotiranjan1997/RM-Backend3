require("dotenv").config();
const express = require("express");
const { User } = require("../models/userModel");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const {
  authMiddleWare,
  authLoginMiddleWare,
  authValidator,
} = require("../middleWares/authMiddleware");
const privateKey = process.env.secret_key;

// For Sign-up Router

userRoute.post("/signup", authMiddleWare, async (req, res) => {
  const { name, email, password, is_admin } = req.body;

  try {
    await User.create({ name, email, password, is_admin });
    res.status(200).send({ msg: "signing up successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Signup failed !" });
  }
});

// For Login Router

userRoute.post("/login", authLoginMiddleWare, async (req, res) => {
  const { user } = req.body;

  try {
    jwt.sign({ user }, privateKey, function (err, token) {
      if (err) {
        res.status(500).send({ msg: "Login failed !" });
      }
      if (token) {
        res
          .status(200)
          .send({ msg: "Login Successful", token, is_Admin: user.is_admin });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Login failed !" });
  }
});

userRoute.get("/getprofile", authValidator, async (req, res) => {
  const { user } = req.body;
  try {
    res.send({ msg: "user Data", user: user });
  } catch (err) {
    res.status(500).send({ msg: "Login failed !" });
  }
});
module.exports = { userRoute };
