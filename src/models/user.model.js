const mongoose = require("mongoose");

const userSchem = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const User = mongoose.model("user", userSchem);

module.exports = { User };
