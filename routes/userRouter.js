var express = require("express");
var app = express();
var userController = require('../controllers/userController.js')

var userRouter = express.Router();
require("express-async-await")(app);
var user = require("../models/User");
userRouter.route("/").get(userController.get_all);
userRouter.route("/signup").post(userController.signup_user);
userRouter.route("/login").post(userController.login_user);

module.exports = userRouter;
