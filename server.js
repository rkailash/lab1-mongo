//Express
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Cors
const cors = require("cors");
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

//Passport
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("./config/settings");
require("./config/passport")(passport);
app.use(passport.initialize());

//Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//morgan
const morgan = require("morgan");
app.use(morgan("dev"));

app.set("view engine", "ejs");

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

//AWS
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: ""
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: "kailashr",
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

//Login Route (needs to be moved to express route)

// app.post("/Login", (req, res, next) => {
//   console.log("Inside Login route");
//   passport.authenticate("local", { session: false }, (error, user) => {
//     if (error || !user) {
//       console.log("User/Password combination doesn't exist!");
//       res.status(400).send({ error });
//     }
//     console.log("Logged in user details", user);
//     /** This is what ends up in our JWT */
//     const payload = {
//       email: user.email,
//       userid: user._id,
//       expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
//     };

//     /** assigns payload to req.user */
//     req.login(payload, { session: false }, error => {
//       if (error) {
//         console.log("Payload assign error", error);
//         res.status(400).send({ error });
//       }

//       /** generate a signed json web token and return it in the response */
//       const token = jwt.sign(JSON.stringify(payload), config.secret);

//       /** assign our jwt to the cookie */
//       res.cookie("jwt", token, {
//         expires: new Date(Date.now() + 900000),
//         httpOnly: true
//       });
//       res.end();
//     });
//   })(req, res, next);
// });

//Other Express Routes
app.post("/test-upload", (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `Property/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  });
});
app.use("/Login", require("./routes/login"));
app.use("/Register", require("./routes/register"));
app.use("/PropertyList", require("./routes/property-list"));
app.use("/Property", require("./routes/property-details"));
app.use("/AddProperty", require("./routes/add_property"));
app.use("/TravelerDash", require("./routes/traveler-dashboard"));
app.use("/OwnerDash", require("./routes/owner-dashboard"));
app.use("/Booking", require("./routes/booking"));
app.use("/Photo", require("./routes/photo"));
app.use("/Home", require("./routes/home"));
//Server listening
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});

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
// console.log("Inside Login req");
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

//start your server on port 3001

// ("SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.ownerid=?")
//Multer
// const multer = require("multer");
// const uuidv4 = require("uuid/v4");
// const fs = require("fs");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folderName = "./uploads";
//     cb(null, folderName);
//   },
//   filename: (req, file, cb) => {
//     const newFilename = `${req.session.userid}-${
//       file.originalname
//     }${path.extname(file.originalname)}`;
//     console.log("file extension");
//     cb(null, newFilename);
//   }
// });
// const upload = multer({ storage });
