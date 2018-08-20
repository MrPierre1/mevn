var express = require("express");
var app = express();
var bcrypt = require('bcrypt')
var jwt = require('jwt-simple');
var payload = { foo: 'bar' };
var secret = 'xxx';

var userRouter = express.Router();
require("express-async-await")(app);
const saltRounds = 10;

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

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    // Store hash in your password DB.

  var newUser = new user({
     username, 
     email, 
     password: hash, 
      image
     });

     await newUser.save();

     await res.status(200).send(newUser);
     await console.log("logged the new user");
    
  });

});






userRouter.route("/login").post(async function(req, res, next) {
  var username = req.body.username,
    password = req.body.password
    
  console.log("response body ", req.body);
  await user.findOne({username:username}, function(err, user) {
    console.log(err, 'user its just---', user)
    bcrypt.compare(password, user.password, function(err, result) {
      // res == true
      if(result){
        var token = jwt.encode(user, secret)
        return res.json({token})
      }
      else{
        return res.status(400).send("bad password")
        
      }
  });


  });
  



});







userRouter.route("/getuser/:username").get(async function(req, res) {

  var token = req.headers.authorization

  var user = jwt.decode(token, secret)


  console.log('req values  ',req.params.id, res.body)
  var username = req.params.username;
  await user.findOne({username}, function(err, user) {
    res.json(user);
  });
});
// Defined edit route
userRouter.route("/edit/:userinfo").get(async function(req, res) {
  console.log('req values  ',req.params.userinfo, res.body)
  var username = req.params.userinfo.username;

  await user.findOneAndUpdate({ username: username }, { $set: { username: userinfo.username, email: userinfo.email, password: userinfo.password } }, { new: true }, function(err, doc) {
    res.status(201).send(doc)
  });

  // await user.findOne({username}, async function(err, user) {
  //   await 
  //   res.json(user);
  // });
});

//  Defined update route
userRouter.route("/update/:username").post(function(req, res) {
  user.findById(req.params.id, function(err, user) {
    if (!user) return next(new Error("Could not load Document"));
    else {
      // do your updates here
      user.user = req.body.user;

      user
        .save()
        .then(user => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
userRouter.route("/delete/:username").delete( async function(req, res) {
  var username = req.params.username;

  await user.findOne({username: username}, async function (error, user){
    if(!user) {
       res.status(400).send("could not find user")
       return;
    }
    console.log(error, "This object will get deleted " + user);
   await user.remove();
    res.status(200).send('person deleted')

});
  //  user.findOne({ username:username}).remove().exec().then(function(data){
  //    console.log("errrrrr   ", data);
  //  })
});

module.exports = userRouter;
