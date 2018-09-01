var express = require("express");
var app = express();
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");
var secret = "xxx";

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
      username: username,
      email: email,
      password: hash,
      image: image,
    });

    await newUser.save();

    await res.status(200).send(newUser);
    await console.log("logged the new user");
    next();
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
//   // check header or url parameters or post parameters for token
//   console.log("stuff", req.body, req.header, req.headers);

//   var token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.decode(token, secret, function(err, decoded) {
//       if (err) {
//         return res.json({
//           success: false,
//           message: "Failed to authenticate token."
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
//       message: "No token provided."
//     });
//   }
// });

userRouter.route("/getuser/:username").get(async function(req, res) {
  console.log("stuff", req.body, req.header, req.headers);
  var token = req.headers.authorization;

  // var user = jwt.decode(token, secret);

  // console.log("req values  ", req.params.id, res.body);

  // if (!token) {
  //   res
  //     .status(400)
  //     .send("yu need a token")
  //     .end();
  // }
  // if (token) {
  //   return res.status(300).send(token);
  // }

  // var username = req.params.username;
  // await user.findOne(
  //   {
  //     username
  //   },
  //   function(err, user) {
  //     res.json(user);
  //   }
  // );
});
// // Defined edit route
// userRouter.route("/edit/:userinfo").get(async function(req, res) {
//   console.log("req values  ", req.params.userinfo, res.body);
//   var username = req.params.userinfo.username;

//   await user.findOneAndUpdate(
//     {
//       username: username
//     },
//     {
//       $set: {
//         username: userinfo.username,
//         email: userinfo.email,
//         password: userinfo.password
//       }
//     },
//     {
//       new: true
//     },
//     function(err, doc) {
//       res.status(201).send(doc);
//     }
//   );

//   // await user.findOne({username}, async function(err, user) {
//   //   await
//   //   res.json(user);
//   // });
// });

// //  Defined update route
// userRouter.route("/update/:username").post(function(req, res) {
//   user.findById(req.params.id, function(err, user) {
//     if (!user) return next(new Error("Could not load Document"));
//     else {
//       // do your updates here
//       user.user = req.body.user;

//       user
//         .save()
//         .then(user => {
//           res.json("Update complete");
//         })
//         .catch(err => {
//           res.status(400).send("unable to update the database");
//         });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// userRouter.route("/delete/:username").delete(async function(req, res) {
//   var username = req.params.username;

//   await user.findOne(
//     {
//       username: username
//     },
//     async function(error, user) {
//       if (!user) {
//         res.status(400).send("could not find user");
//         return;
//       }
//       console.log(error, "This object will get deleted " + user);
//       await user.remove();
//       res.status(200).send("person deleted");
//     }
//   );
//   //  user.findOne({ username:username}).remove().exec().then(function(data){
//   //    console.log("errrrrr   ", data);
//   //  })
// });

module.exports = userRouter;
