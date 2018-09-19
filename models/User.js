
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const validator = require('express-joi-validation')({});


// Define collection and schema for users
var userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true},
  password: {type: String, required: true},
  image:  { data: Buffer, contentType: String },
  date: { type: Date, default: Date.now }
}, {timestamps: true},
{
    collection: 'users',
    versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
