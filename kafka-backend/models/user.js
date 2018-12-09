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

module.exports = mongoose.model("User", UserSchema);
