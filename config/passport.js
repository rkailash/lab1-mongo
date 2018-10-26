const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const config = require("./settings");

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};
passport.use(
  new JwtStrategy(opts, function(jwt_payload, callback) {
    User.findOne({ id: jwt_payload.id }, function(err, user) {
      if (err) {
        return document(err, false);
      }

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);
