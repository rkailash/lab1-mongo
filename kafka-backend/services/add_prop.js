const mongoose = require("mongoose");
const mlab = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mlab);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PropModel = require("../models/property");

function handle_request(msg, callback) {
  let { headline, accomodates, bathrooms, bedrooms, type } = msg.details;
  let { price, city, photos } = msg;
  let Name = headline;
  let Sleeps = accomodates;
  let Bathrooms = bathrooms;
  let Bedrooms = bedrooms;
  let Type = type;
  let Price = price;
  let Location = city;
  let Photos = photos;

  let Property = new PropModel({
    _id: new mongoose.Types.ObjectId(),
    name: Name,
    owner: mongoose.Types.ObjectId(msg.userid),
    owneremail: msg.email,
    sleeps: Sleeps,
    bathrooms: Bathrooms,
    bedrooms: Bedrooms,
    type: Type,
    price: Price,
    location: Location,
    photos: Photos
  });

  Property.save()
    .then(property => {
      callback(null, property);
    })
    .catch(error => {
      callback(null, error);
    });
}

exports.handle_request = handle_request;
