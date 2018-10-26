const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
  _id: Schema.Types.ObjectId,
  property: { type: Schema.Types.ObjectId, ref: "Property" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  startdate: Date,
  enddate: Date
});

module.exports = mongoose.model("Booking", BookingSchema);
