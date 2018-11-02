const express = require("express");
const router = express.Router();
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

const kafka = require("../kafka/client");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let payload = { ...req.body, ...req.user };
    console.log("Payload:", payload);
    console.log("Inside Add Property route! User id is :", req.user.email);

    kafka.make_request("add_property", payload, function(err, result) {
      if (err) {
        console.log("Error creating property :", err);
        res.status(404).send(err);
      } else {
        console.log("Property added successfuly", result);
        res.status(200).send({ result });
      }
    });
  }
);
module.exports = router;

// let {
//   headline,
//   accomodates,
//   bathrooms,
//   bedrooms,
//   type,
//   price,
//   city
// } = req.body;
// let Name = headline;
// let Sleeps = accomodates;
// let Bathrooms = bathrooms;
// let Bedrooms = bedrooms;
// let Type = type;
// let Price = price;
// let Location = city;
// console.log("Request body", req.body);

// let Property = new PropModel({
//   _id: new mongoose.Types.ObjectId(),
//   name: Name,
//   owner: mongoose.Types.ObjectId(req.user.userid),
//   sleeps: Sleeps,
//   bathrooms: Bathrooms,
//   bedrooms: Bedrooms,
//   type: Type,
//   price: Price,
//   location: Location,
//   photos: Photos
// });

// Property.save()
//   .then(property => {
//     console.log("Property created : ", property);
//     res.status(200).send({ property });
//   })
//   .catch(err => {
//     console.log("Error creating property!", err);
//     res.status(404).send(err);
//   });

module.exports = router;
