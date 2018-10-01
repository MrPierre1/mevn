
var project = require("../models/project");
var mongoose = require('mongoose');

exports.get_all = async (req, res) => {
    const projects = await project.find();
    res.json(projects);
  }

  exports.get_one = async (req, res, next) => {
    const title = req.params.id;
    const oneproject = await project.findById(title);
    res.json(oneproject);
    next();
  }

  exports.create_one = async (req, res, next) => {
    const title = req.body.title,
      author = req.body.author,
      comments = req.body.comments,
      endDate = req.body.endDate;
    if (!title || !endDate) {
      res.status(401).send("please send over title, author and body");
      return;
    }

    const newproject = new project({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      author: author,
      comments: comments,
      endDate: endDate
    });
    await newproject.save();
    await res.status(200).send(newproject);
  }

  exports.edit_one = async (req, res, next) => {
      console.log("id", req.params.id, "body", req.body);
    await project
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { comments: req.body.body } },
        { new: true }
      )
      .then(function(project, err) {
        res.status(201).send(project);
        next();
      });
    next();
  }

  exports.delete_one = async (req, res, next) => {
    project
      .findOneAndDelete({ title: req.params.title })
      .then(async function(project, err) {
        res.status(200).send("the project is deleted");
  
        if (project) {
          project.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the project was gound");
          });
        } else {
          project.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the project was found");
          });
        }
      })
      .catch(err => {
         return res.status(400).send("unable to update the database");
      });
  }