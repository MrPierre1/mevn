var user = require("../models/User");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var mongoose = require("mongoose");
var jwt = require("jwt-simple");
var secret = "xxx";

exports.get_all = async (req, res, next) => {
  var users = await user.find();
  res.json(users);
};

exports.signup_user = async (req, res, next) => {
  var username = req.body.username,
    email = req.body.email,
    password = req.body.password,
    image = req.body.image;

  if (!username || !password || !email) {
    res.status(401).send("please send over username, email and password");
    return;
  }

  bcrypt.hash(password, salt, async (err, hash) => {
    var newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hash,
      image: image,
    });

    await newUser.save();
    await res.status(200).send("User created");
  });
};

exports.login_user = async (req, res, next) => {
  var username = req.body.username,
    password = req.body.password;
  await user
    .findOne({
      username,
    })
    .then(async (user, err) => {
      if (!user) {
        res
          .status(400)
          .send("These credentials do not match anyone in our records");
        return next();
      }
      await bcrypt.compare(password, user.password).then((result, err, val) => {
        if (result) {
          var token = jwt.encode(user, secret);
          return res.json({
            token,
          });
        } else {
          return res.status(400).send("bad credentials");
        }
      });
    });
  next();
};
