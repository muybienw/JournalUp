
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

var UserSchema = new Mongoose.Schema({
    // fields are defined here
    'name': String,
    'profilePicture': String,
    'email': String,
    'password': String,
    'journals': [String], // a list of journal ids
    'favorites': [String] // a list of journal ids
});

exports.Journal = Mongoose.model('Journal', JournalSchema);
exports.User = Mongoose.model('User', UserSchema);


