const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    // can create you own so you can use email in addition or replace of
    type: String,
    required: true,
    // unique: true, instead of using the if statements to make sure no duplicates
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
