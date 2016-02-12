
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var JournalSchema = new Mongoose.Schema({
    // fields are defined here
    'id': String,
    'title': String,
    'time': String,
    'description': String,
    'coverImage': String,
    'collaborators': [String],
    'images': [String]
});

//{
//    "id": "0",
//    "title": "New York",
//    "time": "December 2016",
//    "collaborators": [
//    "Silvia",
//    "Jenny",
//    "Mubin"
//],
//    "description": "Are you ready to go on a vacation to one of the largest cities in the United States?  There are so many different things to do and sites to see in New York City.  In this activity, you will discover many of the things that NYC offers to tourists and design a five day trip to the Big Apple.  Maybe you will even uncover the truth to how it got it's nickname.   Enjoy exploring one of the most amazing places in the US! ",
//    "coverImage": "/images/cover.jpg",
//    "images": [
//    "/images/ny.jpg",
//    "/images/jenny.jpg"
//]
//},

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


