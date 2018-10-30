const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
  _id: Schema.Types.ObjectId,
  property: Schema.Types.ObjectId,
  user: Schema.Types.ObjectId,
  owner: { type: Schema.Types.ObjectId, ref: "Property" },
  startdate: Date,
  enddate: Date
});

module.exports = mongoose.model("Booking", BookingSchema);
