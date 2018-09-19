
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('express-joi-validation')({});

// Define collection and schema for course
var courseSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:  {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  author: String,
  body:   String,
  comments: String,
  date: { type: Date, default: Date.now }
},
{
    collection: 'courses',
    versionKey: false,
});

module.exports = mongoose.model('course', courseSchema);
