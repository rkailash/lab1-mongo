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
  "/OwnerDash",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let ownerId = req.user.userid;
    PropModel.find({ owner: ownerId })
      .then(property => {
        res.status(200).json({ property });
      })

      .catch(err => {
        res.status(400).end();
      });
  }
);

module.exports = router;
