const user = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const mongoose = require("mongoose");
const jwt = require("jwt-simple");
const secret = "xxx";
const multer = require('multer')
const upload = multer({dest: '../uploads/'});

exports.get_all = async (req, res, next) => {
  const users = await user.find();
  res.json(users);
};

exports.signup_user = async (req, res, next) => {
  const {username, email, password, image} = req.body
  if (!username || !password || !email) {
    res.status(401).send("please send over username, email and password");
    return;
  }

  bcrypt.hash(password, salt, async (err, hash) => {
    const newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hash,
      image
    });

     newUser.save();
    await res.status(201).send({id: newUser.id, username: newUser.username});
  });
};

exports.login_user = async (req, res, next) => {
  const {username, password} = req.body
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
          const token = jwt.encode(user, secret);
          return res.json({
            message: "User is logged in", 
            user: user.username,
            token,
          });
        } else {
          return res.status(400).send("bad credentials");
        }
      });
    });
  next();
};
