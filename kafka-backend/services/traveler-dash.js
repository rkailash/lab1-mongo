const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const BookModel = require("../models/booking");

function handle_request(msg, callback) {
  console.log("Traveller :", msg.userid);
  BookModel.find({ user: msg.userid })
    .populate("property", "sleeps bathrooms bedrooms")
    .catch(err => {
      callback(null, err);
    })
    .then(properties => {
      console.log("Properties", properties);
      callback(null, properties);
    });
}

exports.handle_request = handle_request;
