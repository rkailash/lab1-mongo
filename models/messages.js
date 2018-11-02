let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MessageSchema = Schema({
  _id: Schema.Types.ObjectId,
  body: String,
  from: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  timestamp: Date
});
module.exports = mongoose.model("Message", MessageSchema);
