const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside booking:", req.body);
    let payload = { ...req.body, ...req.user };
    console.log("Payload:", payload);
    console.log("Inside Book property route! User id is :", req.user.userid);
    kafka.make_request("book_prop", payload, function(err, result) {
      if (err) {
        console.log("Error booking the property :", err);
        res.status(404).send(err);
      } else {
        console.log("Booking done succesfully", result);
        res.status(200).send({ result });
      }
    });
  }
);

module.exports = router;
