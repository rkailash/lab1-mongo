// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const UserModel = require("../models/user");
// const config = require("./settings");

// module.exports = function(passport) {
//   var opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
//     secretOrKey: config.secret
//   };
//   passport.use(
//     new JwtStrategy(opts, function(jwt_payload, callback) {
//       UserModel.findOne({ id: jwt_payload.id }, function(err, user) {
//         if (err) {
//           return document(err, false);
//         }

//         if (user) {
//           done(null, user);
//         } else {
//           done(null, false);
//         }
//       });
//     })
//   );
// };

const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require("bcrypt");
const config = require("./settings");
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
const UserModel = require("../models/user");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(email, password, done) {
        UserModel.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(`Unable to find the user ${email}. Please Register!`);
          }
          bcrypt.compare(password, user.password, (err, passwordsMatch) => {
            if (err) return done(err);

            if (passwordsMatch) return done(null, user);
            else return done("Incorrect email/password combination");
          });
        });
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: config.secret
      },
      (jwtPayload, done) => {
        if (jwtPayload.expires > Date.now()) {
          return done("jwt expired");
        }

        return done(null, jwtPayload);
      }
    )
  );
};
