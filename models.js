
var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;


var ProjectSchema = new Mongoose.Schema({
  // fields are defined here
    'title': String,
    'date': Date,
    'summary': String,
    'image': String,
    'comments': [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var CommentSchema = new Mongoose.Schema({
    // fields are defined here
    'comment': String
});

exports.Project = Mongoose.model('Project', ProjectSchema);
exports.Comment = Mongoose.model('Comment', CommentSchema);


