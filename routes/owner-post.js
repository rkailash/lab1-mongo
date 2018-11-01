const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
const PropModel = require("../models/property");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.userid);
    console.log("Inside Property POST request! User id is :", req.user.email);
    let {
      headline,
      accomodates,
      bathrooms,
      bedrooms,
      type,
      price,
      city
    } = req.body;
    let Name = headline;
    let Sleeps = accomodates;
    let Bathrooms = bathrooms;
    let Bedrooms = bedrooms;
    let Type = type;
    let Price = price;
    let Location = city;
    console.log("Request body", req.body);


    let Property = new PropModel({
      _id: new mongoose.Types.ObjectId(),
      name: Name,
      owner: mongoose.Types.ObjectId(req.user.userid),
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
        console.log("Property created : ", property);
        res.status(200).send({ property });
      })
      .catch(err => {
        console.log("Error creating property!", err);
        res.status(404).send(err);
      });
  }
);

module.exports = router;
