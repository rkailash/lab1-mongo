const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const config = require("./config/settings");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("./config/passport")(passport);
// const requireAuth = passport.authenticate("jwt", { session: false });

var serveStatic = require("serve-static");

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "kailash",
//     resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration: 5 * 60 * 1000
//   })
// );
app.use(bodyParser.json());
app.use(cookieParser("kailash"));

app.use(morgan("dev"));
app.use(passport.initialize());

//MongoDB connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Models
const UserModel = require("./models/user");
const PropModel = require("./models/property");

// let owner = new UserModel({
//   _id: new mongoose.Types.ObjectId(),
//   email: "kailash@kailash.com",
//   password: "admin",
//   firstname: "Kailash",
//   lastname: "Ramakrishnan",
//   type: "Owner"
// });
// owner.save(err => {
//   console.log(err);
// });
// let doc = new PropModel({
//   _id: new mongoose.Types.ObjectId(),
//   name: "Great place to live",
//   owner: owner._id,
//   sleeps: 5,
//   bathrooms: 3,
//   bedrooms: 3,
//   type: "Cottage",
//   price: 350,
//   location: "San Jose"
// });
// doc.save(err => {
//   console.log(err);
// });

app.set("view engine", "ejs");

//Multer
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = "./uploads";
    cb(null, folderName);
  },
  filename: (req, file, cb) => {
    const newFilename = `${req.session.userid}-${
      file.originalname
    }${path.extname(file.originalname)}`;
    console.log("file extension");
    cb(null, newFilename);
  }
});
const upload = multer({ storage });

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/Login", (req, res, next) => {
  console.log("Inside Login route");
  passport.authenticate("local", { session: false }, (error, user) => {
    if (error || !user) {
      res.status(400).json({ error });
    }
    console.log("Response from authenticate", user);
    /** This is what ends up in our JWT */
    const payload = {
      username: user.email,
      userid: user._id,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
    };

    /** assigns payload to req.user */
    req.login(payload, { session: false }, error => {
      if (error) {
        res.status(400).send({ error });
      }

      /** generate a signed json web token and return it in the response */
      const token = jwt.sign(JSON.stringify(payload), config.secret);

      /** assign our jwt to the cookie */
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      });
      res.status(200).json({ user });
    });
  })(req, res, next);
});

app.get("/Logout", (req, res) => {
  console.log("Inside logout request");
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return res.end();
      } else {
        console.log("User logged out!");
        return res.end();
      }
    });
  }
});

app.post("/Register", (req, res) => {
  console.log("Inside Register Request", UserModel);
  const { email, password, firstname, lastname, type } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;

    let userDocument = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hash,
      firstname: firstname,
      lastname: lastname,
      type: type
    });

    userDocument
      .save()
      .then(user => {
        console.log("User created : ", user);
        res.status(200).json({ ...user });
      })

      .catch(err => {
        console.log("Error creating property!", err);
        res.sendStatus(400).end();
      });
  });
});

app.post(
  "/Owner",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.userid);
    console.log("Inside Owner POST request! User id is :", req.user.username);
    let name = req.body.details.headline;
    let sleeps = req.body.details.accomodates;
    let bathrooms = req.body.details.bathrooms;
    let bedrooms = req.body.details.bedrooms;
    let type = req.body.details.type;
    let price = req.body.price;
    let location = req.body.location;
    console.log("Request body", req.body);

    let Property = new PropModel({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      owner: mongoose.Types.ObjectId(req.user.userid),
      sleeps: sleeps,
      bathrooms: bathrooms,
      bedrooms: bedrooms,
      type: type,
      price: price,
      location: location
    });

    Property.save()
      .then(property => {
        console.log("Property created : ", property);
        res.sendStatus(200).json({ ...property });
      })
      .catch(err => {
        console.log("Error creating property!", err);
        res.sendStatus(400).end();
      });
  }
);

app.get(
  "/Home",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside Home");
    // console.log("Logged in user", req.user.username);
    console.log(req.query.location);

    PropModel.find({ location: req.query.location })

      .then(properties => {
        res.code = "200";
        res.status(200).json({ ...properties });
      })

      .catch(error => {
        res.code = "400";
        res.send = error;
      });
  }
);

app.get("/PropertyList", (req, res) => {
  console.log("Inside Property Results Page");
  let location = req.query.location;
  let startdate = req.query.startdate;
  let enddate = req.query.enddate;
  console.log("Request body:", location);
  PropModel.find({ location: location })

    .then(properties => {
      res.code = "200";
      res.status(200).json({ ...properties });
    })

    .catch(error => {
      res.code = "400";
      res.send = error;
    });
});

app.get("/Property/:id", (req, res) => {
  let propertyId = req.params.id;
  console.log("Inside Property Page of ID:", propertyId);
  PropModel.findById(propertyId)

    .then(properties => {
      res.code = "200";
      res.status(200).json({ properties });
    })

    .catch(error => {
      res.code = "400";
      res.send = error;
    });
});

// let sql = "SELECT * from `property` where `propertyid`= ?";
// pool.query(sql, [propertyId], (err, result) => {
//   if (err) {
//     throw err;
//     res.writeHead(400, {
//       "Content-Type": "text/plain"
//     });
//     res.end("No search results returned");
//   } else {
//     res.writeHead(200, {
//       "Content-Type": "application/json"
//     });
//     res.end(JSON.stringify(result));
//     console.log("Result is:", result);
//   }
// });

app.use(serveStatic(path.join(__dirname, "images")));
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});

// console.log("Inside Login request");
// UserModel.findOne({ email: req.body.email })
//   .catch(err => {
//     throw err;
//   })
//   .then(user => {
//     if (!user) {
//       res.sendStatus(400).end();
//       console.log("User doesn't exist!");
//     } else {
//       user.comparePassword(req.body.password, function(err, isMatch) {
//         if (isMatch && !err) {
//           var token = jwt.sign(user.toJSON(), config.secret, {
//             expiresIn: 10080 // in seconds
//           });
//           res.status(200).json({ success: true, token: "JWT " + token });
//         } else {
//           res.status(401).json({
//             success: false,
//             message: "Authentication failed. Passwords did not match."
//           });
//         }
//       });
//     }
//   });

//       res.code = "200";
//       res.value = user;
//       res.cookie("user_cookie", user._id, {
//         maxAge: 900000,
//         httpOnly: false,
//         path: "/"
//       });
//       req.session.userid = user._id;
//       res.end(JSON.stringify(user));
//       console.log("Login succesful", user._id);

//       console.log("Session id", req.session.userid);
//     } else {
//       res.sendStatus(400).end();
//       console.log("Passwords don't match");
//     }
//   },
//   err => {
//     res.code = "400";
//     res.value =
//       "The email and password you entered did not match our records. Please double-check and try again.";
//     console.log(res.value);
//   }
// );
// console.log("Session id", req.session.userid);
//     });
// });

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

// app.post("/Owner", requireAuth, (req, res) => {
//   console.log("Inside Owner POST request! User id is :", req.user._id);
//   let name = req.body.details.headline;
//   let sleeps = req.body.details.accomodates;
//   let bathrooms = req.body.details.bathrooms;
//   let bedrooms = req.body.details.bedrooms;
//   let type = req.body.details.type;
//   let price = req.body.price;
//   let location = req.body.location;
//   console.log("Request body", req.body);

//   let Property = new PropModel({
//     _id: new mongoose.Types.ObjectId(),
//     name: name,
//     owner: mongoose.Types.ObjectId(req.user._id),
//     sleeps: sleeps,
//     bathrooms: bathrooms,
//     bedrooms: bedrooms,
//     type: type,
//     price: price,
//     location: location
//   });

//   Property.save()
//     .then(property => {
//       console.log("Property created : ", property);
//       res.sendStatus(200).end();
//     })
//     .catch(err => {
//       console.log("Error creating property!", err);
//       res.sendStatus(400).end();
//     });
// });

// let sql =
//   "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
// pool.query(
//   sql,
//   [ownerId, name, sleeps, bathrooms, bedrooms, type, price],
//   (err, result) => {
//     if (err) {
//       console.log("Unable post property");
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("Unable to create property");
//     } else {
//       console.log("Property created successful", result);
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//     }
//   }
// );
// });

//   console.log("Inside Update User", req.body);
//   let firstName = req.body.firstname;
//   let lastName = req.body.lastname;
//   let location = req.body.location;
//   let userId = req.session.userid;

//   let sql = "UPDATE users SET firstname=?,lastname=?,location=? WHERE userid=?";
//   pool.query(sql, [firstName, lastName, location, userId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No results returned");
//     } else {
//       console.log(`User ${userId} has been updated`);
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//     }
//   });
// });

//   let sql = "SELECT * FROM `property` WHERE `location` = ?";
//   pool.query(sql, [location], (err, result) => {
//     console.log("SQL query", sql);
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//       console.log("Result:", result);
//     }
//   });
// });

// app.get("/Trips", (req, res) => {
//   let userId = req.session.userid;
//   let sql =
//     "SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";
//   //let sql =
//   //"SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";

//   console.log("Traveller dashboard");
//   pool.query(sql, [userId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//       console.log("Trips result is", result);
//     }
//   });
// });

// app.get("/OwnerDash", (req, res) => {
//   let ownerId = req.session.userid;
//   let sql = "SELECT * FROM `property` WHERE ownerid = ?";
//   console.log("Fetching Owner Dashboard of Owner ID", ownerId);
//   pool.query(sql, [ownerId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       console.log("Result is ", result);
//       res.end(JSON.stringify(result));
//     }
//   });
// });

// app.post("/Property", (req, res) => {
//   let sql1 = "UPDATE ";
//   let sql2 =
//     "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
// });

// app.post("/Photos", upload.single("selectedFile"), (req, res) => {
//   if (!req.file) {
//     console.log("No file received");
//     res.send({
//       success: false
//     });
//   } else {
//     console.log("File received!", res.file);
//     res.send();
//   }
// });

// app.post("/Booking", (req, res) => {
//   console.log("Inside booking:", req.body);

//   let startDate = req.body.startdate;
//   let endDate = req.body.enddate;
//   let propertyId = req.body.propertyid;
//   let userId = req.session.userid;
//   console.log("Booking made by User ID:", userId);
//   let sql1 = "SELECT ownerid FROM property WHERE propertyid =?";
//   let sql2 =
//     "INSERT INTO booking (`bookingid`,`propertyid`,`userid`,`ownerid`,`startdate`, `enddate`) VALUES (NULL,?,?,?,?,?)";
//   let sql3 = "UPDATE property SET bookedflag=1 WHERE propertyid=?";
//   pool.query(sql1, [propertyId], (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(result[0].ownerid);
//       let OWNERID = result[0].ownerid;
//       pool.query(
//         sql2,
//         [propertyId, userId, OWNERID, startDate, endDate],
//         (err, result1) => {
//           if (err) throw err;
//           else {
//             console.log("Booking Successful", result1);
//             pool.query(sql3, [propertyId], (err, result2) => {
//               if (err) throw err;
//               else {
//                 res.end("Bookng Successful");
//               }
//             });
//           }
//         }
//       );
//     }
//   });
// });

//start your server on port 3001

// ("SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.ownerid=?")
