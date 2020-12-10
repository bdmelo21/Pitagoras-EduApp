const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const availableUserSchema = new Schema(
  {
    lat: Number,
    lng: Number,
    isApproved: Boolean,
    usernameStudent: String,
    usernameTeacher: String,
    email: String,
    zoomlink: String,
    zoompassword: String,
  },
  {
    timestamps: true,
  }
);
const UserAvailable = mongoose.model("AvailableUser", availableUserSchema);
module.exports = UserAvailable;
