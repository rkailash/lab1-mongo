const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
//Passport
const passport = require("passport");
require("../config/passport")(passport);
router.use(passport.initialize());

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let propertyId = req.params.id;
    let { startDate, endDate } = req.query || {};
    let flag;
    console.log("Inside Property Page of ID:", propertyId);
    if (startDate && endDate) {
      BookingModel.find({ property: propertyId })
      .then(properties => {
        var booked = properties.filter(value => {
          return (
            moment(startDate).isBetween(
              value.startdate,
              value.enddate,
              null,
              "[]"
            ) ||
            moment(endDate).isBetween(
              value.startdate,
              value.enddate,
              null,
              "[]"
            )
          );
        });

        if (booked.length > 0) {
          console.log("Flag set to false", booked);
          flag = false;
        }
      })
      .catch(error => {
        console.log("Error in Booking model find", error);
      });
    } else {
      PropModel.findById(propertyId)

      .then(property => {
        res.code = "200";
        res.status(200).json({ Property: property, Available: flag });
      })

      .catch(error => {
        console.log("Error in Property model findbyid", error);
        res.code = "400";
        res.send = error;
      });
    }
    
  }
);

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
