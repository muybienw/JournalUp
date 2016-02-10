
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var JournalSchema = new Mongoose.Schema({
  // fields are defined here
    'title': String,
    'date': Date,
    'summary': String,
    'coverImage': String,
    'collaborators': [String],
    'images': [String]
});

exports.Journal = Mongoose.model('Journal', JournalSchema);


