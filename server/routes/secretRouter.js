const express = require("express");
const app = express();
const secretRouter = express.Router();
require("express-async-await")(app);
var secretController = require('../controllers/secretController.js')

secretRouter.route("/").get(secretController.get_all);

secretRouter.route("/:id").get(secretController.get_one);

secretRouter.route("/new").post(secretController.create_one);

secretRouter.route("/edit/:id").put(secretController.edit_one);

secretRouter.route("/:id").delete(secretController.delete_one);


module.exports = secretRouter;
