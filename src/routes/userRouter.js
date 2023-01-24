const express = require("express");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = process.env.salt;
const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).send({ msg: "user signup Failed !" });
      }

      if (hash) {
        await User.create({ email, password: hash });

        res.status(200).send({ msg: "user signup Successfully !" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "user signup Failed !" });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email, password });
    bcrypt.compare(user.password, password, function (err, result) {
      // result == true
      if (err) {
        res.status(500).send({ msg: "user login Failed !" });
      }
      if (result) {
        res.status(200).send({ msg: "user login Successfully !", user });
      } else {
        res.status(200).send({ msg: "Password Incorrect !" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "user login Failed !" });
  }
});

module.exports = { userRoute };
