
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:  {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  author: String,
  comments: String,
  date: { type: Date, default: Date.now },
  testplans: [],
  endDate: { type: Date, default: Date.now }

},
{
    collection: 'project',
    versionKey: false,
});

module.exports = mongoose.model('project', projectSchema);
