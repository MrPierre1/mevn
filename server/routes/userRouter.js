const express = require("express");
const app = express();
const userController = require('../controllers/userController.js')
const userRouter = express.Router();
const multer = require('multer');
const UPLOAD_PATH = 'uploads';
// const upload = multer({ dest: `${UPLOAD_PATH}/` }); 


require("express-async-await")(app);
userRouter.route("/").get(userController.get_all);
userRouter.route("/signup").post(userController.signup_user);
userRouter.route("/login").post(userController.login_user);
userRouter.route("/fileupload").post(function(req, res){


});

module.exports = userRouter;

