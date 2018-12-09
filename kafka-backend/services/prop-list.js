const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PropModel = require("../models/property");
function handle_request(msg, callback) {
  console.log("Location :", msg.location);
  PropModel.find({ location: msg.location })

    .then(properties => {
      callback(null, properties);
    })

    .catch(error => {
      callback(null, error);
    });
}

exports.handle_request = handle_request;
