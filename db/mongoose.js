const mongoose = require("mongoose");
const mongoDB = (mongoose.Promise = global.Promise);

mongoose.connect(
  "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway"
);

module.exports = { mongoose };
