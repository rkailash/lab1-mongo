const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Traveler id :", req.user.userid);
    let payload = req.user;
    kafka.make_request("travel_dash", payload, function(err, result) {
      if (err) {
        console.log("Error finding properties for traveler :", err);
        res.status(404).send(err);
      } else {
        console.log("Properties", result);
        res.status(200).send(result);
      }
    });
  }
);

module.exports = router;
