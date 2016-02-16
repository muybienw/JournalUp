
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS

var local_database_name = 'journalup';
// var local_database_uri  = 'mongodb://localhost/' + local_database_name
// var database_uri = process.env.MONGOLAB_URI || local_database_uri

var heroku_database_uri = 'mongodb://muybienw:winnie1234@ds055565.mongolab.com:55565/heroku_bdgwnq5z'
var database_uri = heroku_database_uri

var conn = mongoose.connect(heroku_database_uri);

// Do the initialization here

// Step 1: load the JSON data
var data = require('./data.json');

// Step 2: Remove all existing documents
models.Journal
  .find()
  .remove()
  .exec(onceClear); // callback to continue at


// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var journals = data["journals"];
  var to_save_count = journals.length;
  for(var i=0; i<journals.length; i++) {
    var json = journals[i];
    var jour = new models.Journal(json);

    jour.save(function(err, jour) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      console.log(jour);

      if(to_save_count <= 0) {
        console.log('DONE');

        //models.User
        //    .find()
        //    .remove()
        //    .exec(createUser);

       // mongoose.connection.close();
       // res.send(200);

        console.log("finished creating journals!");

        models.User
            .find()
            .remove()
            .exec(createUser);

      }
    });
  }
}

//mongoose.connect(database_uri);

function createUser(err){
  if(err) return console.error(err);


  //"user":
  //{
  //  "name" : "Mubin",
  //    "email" : "journalup@ucsd.edu",
  //    "password": "password",
  //    "profilePicture": "/images/profilepic.png",
  //    "journalNum": "2",
  //    "collaboratorNum": "2",
  //    "favorites": ["0","1"]
  //}

  //var UserSchema = new Mongoose.Schema({
  //  // fields are defined here
  //  'name': String,
  //  'email': String,
  //  'password': String,
  //  'profilePicture': String,
  //  'journals': [{type: Schema.Types.ObjectId, ref: 'Journal'}], // a list of journal ids
  //  'favorites': [{type: Schema.Types.ObjectId, ref: 'Journal'}] // a list of journal ids
  //});



  var user_data = data["user"];
  var user_json = {
    "name" : user_data["name"],
    "email" : user_data["email"],
    "password" : user_data["password"],
    "profilePicture" : user_data["profilePicture"],
    "journals" : [],
    "favorites" : [],
    "collaborators" : [], // should be user_id, now
    "collaboratorNum" : "2",
    "journalNum": "0"
  }

  models.Journal.find(function(err, res){
    // console.log(user_json);
    for(var i=0; i<res.length; i++){
      user_json["journals"].push(res[i]._id);
      console.log(res[i]._id);

      if(i%2==0){
        user_json["favorites"].push(res[i]._id);
      }
    }

    user_json["journalNum"] = user_json["journals"].length;

    var user = new models.User(user_json);
    user.save(function(err){
      if(err) console.error(err);
      console.log(user);
      mongoose.connection.close();
    });

    });
}