const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/settings");

require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.post("/Login", (req, res, next) => {
  console.log("Inside Login route");
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error || !user) {
      console.log(error);
      res.status(400).json({ error });
    }
    console.log("Response from authenticate", user);
    /** This is what ends up in our JWT */
    const payload = {
      email: user.email,
      userid: user._id,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
    };

    /** assigns payload to req.user */
    req.login(payload, { session: false }, error => {
      if (error) {
        console.log(error);
        res.status(400).send({ error });
      }

      /** generate a signed json web token and return it in the response */
      const token = jwt.sign(JSON.stringify(payload), config.secret);

      /** assign our jwt to the cookie */
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });
      res.end();
    });
  })(req, res, next);
});

module.exports = router;
