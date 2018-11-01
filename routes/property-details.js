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
const moment = require("moment");
moment().format();

router.get(
  "/:id/:startdate/:enddate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let propertyId = req.params.id;
    let startDate = req.params.startdate;
    let endDate = req.params.enddate;
    let flag = true;
    console.log("Inside Property Page of ID:", propertyId);
    BookingModel.find({ property: propertyId })
      .then(properties => {
        var booked = properties.filter(value => {
          return (
            moment(startDate).isBetween(
              value.startdate,
              value.enddate,
              null,
              "[]"
            ) ||
            moment(endDate).isBetween(
              value.startdate,
              value.enddate,
              null,
              "[]"
            )
          );
        });

        if (booked.length > 0) {
          console.log("Flag set to false", booked);
          flag = false;
        }

        PropModel.findById(propertyId)

          .then(property => {
            res.code = "200";
            res.status(200).json({ Property: property, Available: flag });
          })

          .catch(error => {
            console.log("Error in Property model findbyid", error);
            res.code = "400";
            res.send = error;
          });
      })
      .catch(error => {
        console.log("Error in Booking model find", error);
      });
  }
);

module.exports = router;
