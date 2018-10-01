
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testplanSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:  {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  status: String
},
{
    collection: 'testplan',
    versionKey: false,
});

module.exports = mongoose.model('testplan', testplanSchema);
