
var testplan = require("../models/testplan");
var project = require("../models/project");

var mongoose = require('mongoose');

exports.get_all = async (req, res) => {
    // const testplans = await testplan.find();
    // res.json(testplans);

    await project.find({testplans})
    
  }

  exports.get_one = async (req, res, next) => {
    const title = req.params.id;
    const onetestplan = await testplan.findById(title);
    res.json(onetestplan);
    next();
  }

  exports.create_one = async (req, res, next) => {
    console.log(" body is this ",req.body);

    const title = req.body.title,
        status = req.body.status
    if (!title) {
      res.status(401).send("please send over title, author and body");
      return;
    }

    const newtestplan = new testplan({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      status: status
    });
    await newtestplan.save();

    await project.findOneAndUpdate(
      {
      _id: '5bad3e6b6a86a7f97087046c'
      },
      { $push: { testplans: "3" } }
  ).then( (data, err) =>{
      console.log("this is an data,", data, "this is the err", err);
  })

    await res.status(200).send(newtestplan);
  }

  exports.edit_one = async (req, res, next) => {
      console.log("id", req.params.id, "body", req.body);
    await testplan
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { comments: req.body.body } },
        { new: true }
      )
      .then(function(testplan, err) {
        res.status(201).send(testplan);
        next();
      });
    next();
  }

  exports.delete_one = async (req, res, next) => {
    testplan
      .findOneAndDelete({ title: req.params.title })
      .then(async function(testplan, err) {
        res.status(200).send("the testplan is deleted");
  
        if (testplan) {
          testplan.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the testplan was gound");
          });
        } else {
          testplan.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the testplan was found");
          });
        }
      })
      .catch(err => {
         return res.status(400).send("unable to update the database");
      });
  }