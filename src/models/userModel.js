const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = { User };
