var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");
var secret = "xxx";
var checkToken = require("../routes/checkToken.js");
var mongoose = require("mongoose");

var userRouter = express.Router();
require("express-async-await")(app);

var salt = bcrypt.genSaltSync(10);

// Require user model in our routes module
var user = require("../models/User");

// Defined get data(index or listing) route
userRouter.route("/").get(async function(req, res) {
  var users = await user.find();
  res.json(users);
});

// Defined store route
userRouter.route("/signup").post(async function(req, res, next) {
  var username = req.body.username,
    email = req.body.email,
    password = req.body.password,
    image = req.body.image;
  console.log("response body ", req.body);
  if (!username || !password || !email) {
    res.status(401).send("please send over username, email and password");
    return;
  }

  bcrypt.hash(password, salt, async function(err, hash) {
    // Store hash in your password DB.

    var newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hash,
      image: image,
    });

    await newUser.save();

    await res.status(200).send(newUser);
    await console.log("logged the new user");
  });
});

userRouter.route("/login").post(async function(req, res, next) {
  var username = req.body.username,
    password = req.body.password;

  console.log("response body ", req.body);

  if (!username || !password) {
    res.status(401).send("please send over username and password");
    return;
  }

  await user
    .findOne({
      username: req.body.username,
    })
    .then(async function(user, err) {
      console.log(err, "user its just---", user);
      if (!user) {
        res
          .status(400)
          .send("These credentials do not match anyone in our records");
        return next();
      }
      await bcrypt
        .compare(password, user.password)
        .then(function(result, err, val) {
          if (result) {
            var token = jwt.encode(user, secret);
            return res.json({
              token,
            });
          } else {
            return res.status(400).send("bad password");
          }
        });
    });
  next();
});

// userRouter.use(function(req, res, next) {
//   var token = req.headers["x-access-token"];
//   if (token) {
//     // verifies secret and checks exp
//     jwt.decode(token, secret, function(err, decoded) {
//       if (err) {
//         return res.json({
//           success: false,
//           message: "Failed to authenticate token.",
//         });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: "No token provided.",
//     });
//   }
//   next();
// });

// userRouter.route("/update/:id", checkToken).post(async function(req, res, next) {
//   await user
//     .findOneAndUpdate(
//       {
//         username: req.body.username,
//       },
//       { $set: { email: "green@testemail.com" } },
//       { new: true }
//     )
//     .then(async function(user, err) {
//       console.log(err, "user its just---", user);
//       if (!user) {
//         res.status(400).send("The user doesnt exist");
//         return next();
//       } else {
//         user
//           .save()
//           .then(user => {
//             return res.json("Update complete");
//           })
//           .catch(err => {
//             return res.status(400).send("unable to update the database");
//           });
//       }
//     });
// });

module.exports = userRouter;
