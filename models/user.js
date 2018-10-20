const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password:  String,
  firstname: String,
  lastname: String,
  type: String
});

module.exports = mongoose.model("User", UserSchema);
