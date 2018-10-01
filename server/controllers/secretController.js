
var secret = require("../models/Secret");
var mongoose = require('mongoose');

exports.get_all = async (req, res) => {
    const secrets = await secret.find();
    res.json(secrets);
  }

  exports.get_one = async (req, res, next) => {
    const title = req.params.id;
    const onesecret = await secret.findById(title);
    res.json(onesecret);
    next();
  }

  exports.create_one = async (req, res, next) => {
    const title = req.body.title,
      author = req.body.author,
      body = req.body.body,
      comments = req.body.comments;
    if (!title || !body || !author) {
      res.status(401).send("please send over title, author and body");
      return;
    }

    const newsecret = new secret({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      author: author,
      comments: comments,
    });
    await newsecret.save();
    await res.status(200).send(newsecret);
  }

  exports.edit_one = async (req, res, next) => {
      console.log("id", req.params.id, "body", req.body);
    await secret
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $set: { comments: req.body.body } },
        { new: true }
      )
      .then(function(secret, err) {
        res.status(201).send(secret);
        next();
      });
    next();
  }

  exports.delete_one = async (req, res, next) => {
    secret
      .findOneAndDelete({ title: req.params.title })
      .then(async function(secret, err) {
        res.status(200).send("the secret is deleted");
  
        if (secret) {
          secret.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the secret was gound");
          });
        } else {
          secret.find({ title: "gt" }).then(function(err, data) {
            res.status(200).send("the secret was found");
          });
        }
      })
      .catch(err => {
         return res.status(400).send("unable to update the database");
      });
  }