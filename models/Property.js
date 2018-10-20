const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PropSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  sleeps: Number,
  bathrooms: Number,
  bedrooms: Number,
  type: String,
  price: Number,
  location: String
});

module.exports = mongoose.model("Property", PropSchema);
