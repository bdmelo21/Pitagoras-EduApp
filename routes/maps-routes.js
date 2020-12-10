const express = require("express");
const { findByIdAndUpdate } = require("../models/teacheravailable-model");
const router = express.Router();
const Teacher = require("../models/teacheravailable-model");
const UserAvailable = require("../models/useravailable");

router.post("/availableteacher", (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const subject = req.body.subject;
  const pricehour = req.body.pricehour;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const info = req.body.info;

  const aNewTeacherAvailable = new Teacher({
    lat: lat,
    lng: lng,
    firstname: firstname,
    lastname: lastname,
    username: username,
    subject: subject,
    pricehour: pricehour,
    email: email,
    phonenumber: phonenumber,
    info: info,
  });
  aNewTeacherAvailable.save((err) => {
    if (err) {
      debugger;
      res.status(400).json({ message: "Saving user to database went wrong." });
      return;
    }
    res.status(200).json(aNewTeacherAvailable);
  });
});
router.post("/availableuser", (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const usernameStudent = req.body.username;
  const usernameTeacher = req.body.teacher;
  const email = req.body.email;
  console.log(req.body);

  UserAvailable.create({
    lat: lat,
    lng: lng,
    usernameStudent: usernameStudent,
    isApproved: false,
    usernameTeacher: usernameTeacher,
    email: email,
  })
    .then((aNewUserAvailable) => {
      res.status(200).json(aNewUserAvailable);
    })
    .catch((err) => {
      res.status(400).json({ message: "Saving user to database went wrong." });
    });
});

router.delete("/deleteteacher/:id", (req, res) => {
  Teacher.findByIdAndRemove(req.params.id).then(() => {
    res.json({ message: `Project with id ${req.params.id} was deleted` });
  });
});
router.get("/allteachers", (req, res) => {
  Teacher.find().then((allTeachersfromDB) => {
    res.json(allTeachersfromDB);
  });
});
router.get("/allusersavailable/:username", (req, res) => {
  //  let newUser = "nothing";
  const userTeacher = req.params.username;
  UserAvailable.find({ usernameTeacher: userTeacher, isApproved: false }).then(
    (requestsToApprove) => {
      res.json(requestsToApprove);
    }
  );
});
router.get("/allteachersavailable/:username", (req, res) => {
  const userTeacher = req.params.username;
  UserAvailable.find({ usernameTeacher: userTeacher, isApproved: true }).then(
    (requestsToApprove) => {
      res.json(requestsToApprove);
    }
  );
});
router.delete("/deleteallteachersavailable/:username", (req, res) => {
  const userTeacher = req.params.username;
  UserAvailable.deleteMany({
    usernameTeacher: userTeacher,
    isApproved: false,
  }).then(() => {
    res.json({ message: `Project with id ${req.params.id} was deleted` });
  });
});
router.put("/updateavailableuser/:id", (req, res) => {
  const id = req.params.id;
  let accept = req.body.accept;
  let zoomLink = req.body.zoomlink;
  let zoompassword = req.body.zoompassword;
  UserAvailable.findByIdAndUpdate(id, {
    isApproved: accept,
    zoomlink: zoomLink,
    zoompassword: zoompassword,
  }).then(() => {
    res.json({ message: `Project with id ${req.params.id} was updated` });
  });
});

module.exports = router;
