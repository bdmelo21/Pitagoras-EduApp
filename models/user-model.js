const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    isteacher: Boolean,
    email: String,
    googleId: String,
    subject: String,
    info: String,
    pricehour: String,
    phonenumber: String,
    creditcard: String,
    ratingHistory: Number,
    accountZoomId: String,
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
