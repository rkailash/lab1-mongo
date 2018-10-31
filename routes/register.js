const express = require("express");
const router = express.Router();

const kafka = require("../kafka/client");

router.post("/Register", (req, res) => {
  kafka.make_request("create_user", req.body, function(err, results) {
    console.log("Inside Register Request");

    if (err) {
      console.log("Error creating property!", err);
      res.sendStatus(400).end();
    } else {
      console.log("User created : ", results);
      res.status(200).json({ results });
    }
  });
});

module.exports = router;

// app.post("/Register", (req, res) => {
//   console.log("Inside Register request");
//   if (!req.body.email || !req.body.password) {
//     res
//       .status(400)
//       .json({ success: false, message: "Please enter username and password." });
//   } else if {

//   }
//     let User = new UserModel({
//       ...req.body,
//       _id: new mongoose.Types.ObjectId()
//     });
//     User.save()
//       .then(user => {
//         console.log("User created : ", user);
//         res.status(200).send("User created successfuly!");
//       })

//       .catch(err => {
//         console.log("Error creating property!", err);
//         res.sendStatus(400).end();
//       });
//   }
// });
