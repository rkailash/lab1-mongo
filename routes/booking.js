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
const BookingModel = require("../models/booking");

router.post(
  "/Booking",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside booking:", req.body);
    let { startdate, enddate, propertyid } = req.body;
    let { email, userid } = req.user;
    console.log("Booking made by ", email, " USER ID: ", userid);
    PropModel.findById(propertyid, "owner", function(err, result) {
      if (err) console.log("Error fetching property id", err);
      else {
        console.log("OwnerId :", result.owner);
        let NewBooking = new BookingModel({
          _id: new mongoose.Types.ObjectId(),
          property: propertyid,
          user: userid,
          owner: result.owner,
          startdate: startdate,
          enddate: enddate
        });
        NewBooking.save(function(err, booking) {
          if (err) {
            console.log("Error creating booking!", err);
            res.status(400).end();
          } else {
            console.log("Booking created : ", booking);
            res.status(200).json({ booking });
          }
        });
      }
    });
  }
);

module.exports = router;
