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

//let sql =
("SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?");
//let sql =
//"SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";

router.get(
  "/TravelerDash",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    PropModel.find({})
      .catch(err => {
        throw err;
      })
      .then(users => {
        console.log(users);
      });
  }
);

module.exports = router;
