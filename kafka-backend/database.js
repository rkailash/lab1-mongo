let mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect("mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway")
      .then(() => {
        console.log("Database connection succesful");
      })

      .catch(err => {
        console.log("Database connection error", err);
      });
  }
}

mondule.exports = new Database();
