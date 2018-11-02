const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

router.get(
  "/:id/:startdate/:enddate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Inside Property Page of ID:", req.params.id);
    let payload = req.params;
    kafka.make_request("property_details", payload, function(err, result) {
      if (err) {
        console.log("Error :", err);
        res.status(404).send(err);
      } else {
        console.log("Property results ", result);
        res
          .status(200)
          .json({ Property: result.property, Available: result.available });
      }
    });
  }
);

module.exports = router;

//     let propertyId = req.params.id;
//     let startDate = req.params.startdate;
//     let endDate = req.params.enddate;
//     let flag = true;
//
//     BookingModel.find({ property: propertyId })
//       .then(properties => {
//         var booked = properties.filter(value => {
//           return (
//             moment(startDate).isBetween(
//               value.startdate,
//               value.enddate,
//               null,
//               "[]"
//             ) ||
//             moment(endDate).isBetween(
//               value.startdate,
//               value.enddate,
//               null,
//               "[]"
//             )
//           );
//         });

//         if (booked.length > 0) {
//           console.log("Flag set to false", booked);
//           flag = false;
//         }

//         PropModel.findById(propertyId)

//           .then(property => {
//             res.code = "200";
//             res.status(200).json({ Property: property, Available: flag });
//           })

//           .catch(error => {
//             console.log("Error in Property model findbyid", error);
//             res.code = "400";
//             res.send = error;
//           });
//       })
//       .catch(error => {
//         console.log("Error in Booking model find", error);
//       });
//   }
// );

// module.exports = router;
