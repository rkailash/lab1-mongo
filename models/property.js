const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PropSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    lowercase: true
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  owneremail: String,
  sleeps: Number,
  bathrooms: Number,
  bedrooms: Number,
  type: {
    type: String,
    lowercase: true
  },
  price: Number,
  location: {
    type: String
  },
  photos: Array
});

module.exports = mongoose.model("Property", PropSchema);
