
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var secretSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:  {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  author: String,
  comments: String,
  date: { type: Date, default: Date.now }
},
{
    collection: 'secret',
    versionKey: false,
});

module.exports = mongoose.model('secret', secretSchema);
