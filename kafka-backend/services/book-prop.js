const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const BookModel = require("../models/booking");
const PropModel = require("../models/property");

function handle_request(msg, callback) {
  let { startdate, enddate, propertyid, email, userid } = msg;
  console.log("Booking made by ", email, " USER ID: ", userid);
  PropModel.findById(propertyid, "owner")
    .then(result => {
      console.log("OwnerId :", result.owner);
      let NewBooking = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        property: propertyid,
        user: userid,
        owner: result.owner,
        startdate: startdate,
        enddate: enddate
      });
      NewBooking.save()
        .catch(err => {
          callback(null, err);
        })
        .then(booking => {
          callback(null, booking);
        });
    })
    .catch(error => {
      callback(null, error);
    });
}

exports.handle_request = handle_request;
