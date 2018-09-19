const express = require("express");
const app = express();
const mongoose = require("mongoose");
const courseRouter = express.Router();
require("express-async-await")(app);

// Require user model in our routes module
const course = require("../models/Course");

// Defined get data(index or listing) route
courseRouter.route("/").get(async function(req, res) {
  console.log("finding courses");
  const courses = await course.find();
  res.json(courses);
});

courseRouter.route("/new").post(async function(req, res, next) {
  const title = req.body.title,
    author = req.body.author,
    body = req.body.body,
    comments = req.body.comments;

  console.log("response body ", req.body);
  if (!title || !body || !author) {
    res.status(401).send("please send over title, author and body");
    return;
  }
  const newCourse = new course({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    author: author,
    body: body,
    comments: comments,
  });

  await newCourse.save();

  await res.status(200).send(newCourse);
  await console.log("logged the new course");
});

courseRouter.route("/update/:title").put(async function(req, res, next) {
  console.log(req.body, "data and courses", req.params);

  await course
    .findOneAndUpdate(
      {
        title: req.params.title,
      },
      { $set: { title: req.body.title } },
      { new: true }
    )
    .then(function(err, course) {
      console.log(err, "course its just---", course);
      res.status(201).send("course name is updated");
      next();
    });
  next();
});

courseRouter.route("/:title").delete(async function(req, res, next) {
  console.log(req.body);
  course
    .findOneAndDelete({ title: req.params.title })
    .then(async function(course, err) {
      console.log(err, "deleted---", course);
      // if (!course) {
      res.status(200).send("the course is deleted");

      if (course) {
        course.find({ title: "gt" }).then(function(err, data) {
          console.log(err, "its data and error", data);
          res.status(200).send("the course was gound");
        });
      } else {
        course.find({ title: "gt" }).then(function(err, data) {
          console.log(err, "its data and error", data);
          res.status(200).send("the course was found");
        });
      }
    })
    .catch(err => {
      //  return res.status(400).send("unable to update the database");
    });
});

// // Defined store route
// courseRouter.route("/signup").post(async function(req, res, next) {
//   const title = req.body.coursename,
//     email = req.body.email,
//     body = req.body.password,
//     image = req.body.image;
//   console.log("response body ", req.body);
//   if (!coursename || !password || !email) {
//     res.status(401).send("please send over username, email and password");
//     return;
//   }

//   bcrypt.hash(password, salt, async function(err, hash) {
//     // Store hash in your password DB.

//     const newUser = new user({
//       username: username,
//       email: email,
//       password: hash,
//       image: image,
//     });

//     await newUser.save();

//     await res.status(200).send(newUser);
//     await console.log("logged the new user");
//     next();
//   });
// });

// courseRouter.route("/login").post(async function(req, res, next) {
//   const username = req.body.username,
//     password = req.body.password;

//   console.log("response body ", req.body);

//   if (!username || !password) {
//     res.status(401).send("please send over username and password");
//     return;
//   }

//   await user
//     .findOne({
//       username: req.body.username,
//     })
//     .then(async function(user, err) {
//       console.log(err, "user its just---", user);
//       if (!user) {
//         res
//           .status(400)
//           .send("These credentials do not match anyone in our records");
//         return next();
//       }
//       await bcrypt
//         .compare(password, user.password)
//         .then(function(result, err, val) {
//           if (result) {
//             const token = jwt.encode(user, secret);
//             return res.json({
//               token,
//             });
//           } else {
//             return res.status(400).send("bad password");
//           }
//         });
//     });
//   next();
// });

// courseRouter.use(function(req, res, next) {
//   const token = req.headers["x-access-token"];
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
//   next();
// });

// courseRouter.route("/update/", checkToken).post(async function(req, res, next) {

//   await user
//     .findOneAndUpdate({
//       username: req.body.username},
//       {$set:{email:"green@testemail.com"}}, {new: true})
//     .then(async function(user, err) {
//       console.log(err, "user its just---", user);
//       if (!user) {
//         res
//           .status(400)
//           .send("The user doesnt exist");
//         return next();
//       }
//       else{

//          user
//         .save()
//         .then(user => {
//          return res.json("Update complete");

//         })
//         .catch(err => {
//          return res.status(400).send("unable to update the database");
//         });

//       }
//     });
// });

// // Defined edit route
// courseRouter.route("/edit/:userinfo").get(async function(req, res) {
//   console.log("req values  ", req.params.userinfo, res.body);
//   const username = req.params.userinfo.username;

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

// // Defined delete | remove | destroy route
// courseRouter.route("/delete/:username").delete(async function(req, res) {
//   const username = req.params.username;

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

module.exports = courseRouter;
