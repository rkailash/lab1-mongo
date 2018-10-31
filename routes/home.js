const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PropModel = require("../models/property");

router.get(
  "/Home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside Home");
    // console.log("Logged in user", req.user.username);
    console.log(req.query.location);

    PropModel.find({ location: req.query.location })

      .then(properties => {
        res.code = "200";
        res.status(200).json({ ...properties });
      })

      .catch(error => {
        res.code = "400";
        res.send = error;
      });
  }
);

module.exports = router;
