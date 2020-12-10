const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teachingSchema = new Schema(
  {
    teaching: String,
    usernameStudent: String,
    usernameTeacher: String,
    rating: Number,
    start: Date,
    end: Date,
  },
  {
    timestamps: true,
  }
);
const teaching = mongoose.model("Teaching", teachingSchema);
module.exports = teaching;
