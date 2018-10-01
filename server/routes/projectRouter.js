const express = require("express");
const app = express();
const projectRouter = express.Router();
require("express-async-await")(app);
var projectController = require('../controllers/projectController.js')

projectRouter.route("/").get(projectController.get_all);

projectRouter.route("/:id").get(projectController.get_one);

projectRouter.route("/new").post(projectController.create_one);

projectRouter.route("/edit/:id").put(projectController.edit_one);

projectRouter.route("/:id").delete(projectController.delete_one);


module.exports = projectRouter;
