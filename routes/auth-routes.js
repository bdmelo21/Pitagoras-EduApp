const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const passport = require("passport");

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (!username || !password || !email) {
    res.status(400).json({ message: "Provide username, email and password" });
    return;
  }
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const aNewUser = new User({
      username: username,
      email: email,
      password: hashPass,
    });
    aNewUser.save((err) => {
      if (err) {
        debugger;
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }
      res.status(200).json(aNewUser);
    });
  });
});
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res);
});
router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});
router.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
    return;
  }
  res.json({});
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_HOSTNAME}/pitagoras/dashboard`,
    failureRedirect: `${process.env.CLIENT_HOSTNAME}/login`,
  })
);
router.post("/teacherinfo", (req, res) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const address = req.body.address;
  const email = req.body.email;
  const password = req.body.password;
  const phonenumber = req.body.phonenumber;
  const subject = req.body.subject;
  const info = req.body.info;
  const pricehour = req.body.pricehour;
  const creditcard = req.body.creditcard;

  console.log(req);
  if (
    !username ||
    !password ||
    !email ||
    !pricehour ||
    !creditcard ||
    !phonenumber ||
    !subject
  ) {
    res.status(400).json({
      message:
        "Provide username, email, password, creditcard, phonenumber, subject",
    });
    return;
  }
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const aNewTeacher = new User({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      isteacher: true,
      password: hashPass,
      pricehour: pricehour,
      info: info,
      creditcard: creditcard,
      subject: subject,
      phonenumber: phonenumber,
      address: address,
    });
    aNewTeacher.save((err) => {
      if (err) {
        debugger;
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }
      console.log(aNewTeacher);
      res.status(200).json(aNewTeacher);
    });
  });
});
module.exports = router;
