const express = require("express");
const app = express();
const testplanRouter = express.Router();
require("express-async-await")(app);
var testplanController = require('../controllers/testplanController.js')

testplanRouter.route("/").get(testplanController.get_all);

testplanRouter.route("/:id").get(testplanController.get_one);

testplanRouter.route("/new").post(testplanController.create_one);

testplanRouter.route("/edit/:id").put(testplanController.edit_one);

testplanRouter.route("/:id").delete(testplanController.delete_one);


module.exports = testplanRouter;
