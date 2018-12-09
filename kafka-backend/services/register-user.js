const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);

let UserModel = require("../models/user");
const saltRounds = 10;
function handle_request(msg, callback) {
  console.log("In handle request:" + JSON.stringify(msg));
  const { email, password, firstname, lastname, type } = msg;
  console.log("Email :", msg.email);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log("Inside hash function", email);
    if (err) callback(null, "Password hashing failed!");
    else {
      console.log("Inside else block", hash);
      let User = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: hash,
        firstname: firstname,
        lastname: lastname,
        type: type
      });

      console.log("New User :", User);

      // mongoose.connect(
      //   "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway",
      //   function(err) {
      //     if (err) callback(null, err);
      //     else callback(null, "Success!");
      //   }
      // );

      User.save()
        .then(user => {
          console.log("Inside Save!!");
          callback(null, user);
        })

        .catch(err => {
          callback(null, new Error("Error creating user!" + err));
        });
    }
  });
}

exports.handle_request = handle_request;
