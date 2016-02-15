/**
 * Created by MuyBien on 2/9/16.
 */

var data = require('../data.json');
var models = require('../models.js');

var search = {'name' : 'Mubin'};

exports.viewSetting = function (req, res) {
    models.User.findOne(search, function(err, result){
        if(err) console.log(err);
        console.log("find the user:" + result);
        res.render('setting', result);
    });
};

exports.changeSetting = function (req, res) {
    console.log("in the change setting function");

    if (req.query.length == 0) ;
    else {

        var new_name = req.query.username;
        var new_email = req.query.email;
        var new_password = req.query.password;
        var new_profilePicture = '/images/jenny.jpg';

        if (new_name.length == 0) {
            new_name = "Mubin";
            new_profilePicture = "/images/profilepic.png";
        }
        if (new_email.length == 0) new_email = "journalup@ucsd.edu";
        if (new_password.length == 0) new_password = "password";


        //"user":
        //{
        //    "name" : "Mubin",
        //    "email" : "journalup@ucsd.edu",
        //    "password": "password",
        //    "profilePicture": "/images/profilepic.png",
        //    "journalNum": "2",
        //    "collaboratorNum": "2"
        //}

        data["user"].name = new_name;
        data["user"].email = new_email;
        data["user"].password = new_password;
        data["user"].profilePicture = new_profilePicture;
        data["user"].journalNum = 1;
        data["user"].collaboratorNum = 2;

        console.log(new_name);
        console.log(new_email);
        console.log(new_password);

        console.log(data["user"]);
    }

    res.render("setting", data);
};

exports.uploadProfilePic = function(req, res){

    console.log(req);

    if (!req.file) {
        res.send('No files were uploaded.');
        return;
    }


    models.User.find(function(err, result){

        var user = result[0];
        var path = req.file.path;
        // path.splice("public/".length);

        // path = path.splice(7, path.length);
        path = path.substring(6);
        console.log(path);
        console.log(typeof path);

        models.User.findOneAndUpdate({_id: user._id}, {$set:{profilePicture: path}}, function(err){
            if(err) {console.error(err); res.send(500);}
            console.log("changed profile picture");
            models.User.findOne(search, function(err, user){
                res.render('setting', user);
            });
        });
    });
}