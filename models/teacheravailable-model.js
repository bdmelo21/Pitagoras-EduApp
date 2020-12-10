const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const availableTeacherSchema = new Schema(
  {
    lat: Number,
    lng: Number,
    firstname: String,
    lastname: String,
    username: String,
    subject: String,
    pricehour: Number,
    email: String,
    phonenumber: String,
    info: String,
  },
  {
    timestamps: true,
  }
);
const AvailableTeacher = mongoose.model(
  "AvailableTeacher",
  availableTeacherSchema
);
module.exports = AvailableTeacher;
