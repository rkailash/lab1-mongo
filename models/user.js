let mongoose = require("mongoose");
let validator = require("validator");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: value => {
      return validator.isEmail(value);
    }
  },
  password: String,
  firstname: {
    type: String,
    lowercase: true
  },
  lastname: {
    type: String,
    lowercase: true
  },
  type: {
    type: String,
    lowercase: true
  }
});

// UserSchema.pre("save", function(next) {
//   var user = this;
//   if (this.isModified("password") || this.isNew) {
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) {
//         return next(err);
//       }
//       bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     return next();
//   }
// });

// UserSchema.methods.comparePassword = function(pw, cb) {
//   bcrypt.compare(pw, this.password, function(err, isMatch) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };

module.exports = mongoose.model("User", UserSchema);
