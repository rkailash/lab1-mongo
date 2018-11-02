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
    console.log("Inside Property List Page");
    console.log("req.query : ", req.query);
    kafka.make_request("property_list", req.query, function(err, result) {
      if (err) {
        console.log("Error searching for property", err);
        res.status(404).send(err);
      } else {
        console.log("Property results ", result);
        res.status(200).json(result);
      }
    });
  }
);

module.exports = router;
