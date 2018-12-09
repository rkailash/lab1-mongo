const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PropModel = require("../models/property");
const BookModel = require("../models/booking");

const moment = require("moment");
moment().format();
function handle_request(msg, callback) {
  let propertyId = msg.id;
  let { startDate, endDate } = msg || {};
  let flag;
  if (startDate && endDate) {
    BookModel.find({ property: propertyId })
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
      })
      .catch(error => {
        console.log("Error in Booking model find", error);
      });
  }
  PropModel.findById(propertyId)

    .then(property => {
      callback(null, { property: property, available: flag });
    })
    .catch(error => {
      callback(null, error);
    });
}

exports.handle_request = handle_request;
