/**
 * Created by MuyBien on 2/9/16.
 */

var data = require('../data.json');
var models = require('../models.js');

var search = {'name' : 'Mubin'};

exports.viewSetting = function (req, res) {
    models.User.findOne(function(err, result){
        if(err) console.log(err);
        console.log("find the user:" + result);
        res.render('setting', result);
    });
};

exports.changeSetting = function (req, res) {
    console.log("in the change setting function");
    console.log(req.body);
    console.log(req.file);

    models.User.findOne(search, function(err, result){
        var new_name = req.body.username ? req.body.username: result.name;
        var new_email = req.body.email ? req.body.email: result.email;
        var new_password = req.body.password ? req.body.password : result.password ;
        var new_propic = req.file ? req.file.path.substring(6) : result.profilePicture;

        var update = {
            name : new_name,
            email : new_email,
            password : new_password,
            profilePicture : new_propic
        }

        console.log(update);

        models.User.findOneAndUpdate({_id: result._id}, {$set: update}, function(err, user){
            if(err) {console.error(err); res.send(500);}
            console.log("profile info updated");
            console.log(user);

            res.json({success: true});

            //models.User.find(function(err, result){
            //    if(err) console.log(err);
            //    console.log("find the user:" + result);
            //    res.render('setting', result);
            //});
        });

    });
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
                if(err) console.log(err);
                res.json({success: true});
            });
        });
    });
}