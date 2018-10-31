const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = Schema({
  _id: Schema.Types.ObjectId,
  property: Schema.Types.ObjectId,
  user: Schema.Types.ObjectId,
  owner: Schema.Types.ObjectId,
  startdate: Date,
  enddate: Date
});

BookingSchema.pre("save", function(next) {});

module.exports = mongoose.model("Booking", BookingSchema);
