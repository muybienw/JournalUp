/**
 * Created by MuyBien on 1/31/16.
 */

var models = require('../models');

exports.signIn = function(req, res){
    req.session.user = null;
    console.log(req.session);

    req.session.destroy();

    console.log("after destorying the session");
    console.log(req.session);

    res.render('signin');
};

exports.signUp = function(req, res){
    res.render('signup');
};

exports.Adminsignin = function(req, res){
    var user = {name: "MuyBien"};
    req.session.user = user;
    res.redirect('/myjournal');
};

exports.FBsignin = function(req, res){

    console.log("post data:");
    console.log(req.body);

    var searchOption = {
        name : req.body.first_name
    };

    models.User.findOne(searchOption, function(err, result){
        if(err){console.log(err); res.send(500);}

        if (!result) {
            console.log("not found, create a new user");

            var user_json = {
                "name" : req.body.first_name,
                "email" : "",
                "password" : "",
                "profilePicture" : req.body.profilePicUrl,
                "journals" : [],
                "favorites" : [],
                "collaborators" : [], // should be user_id, now
                "collaboratorNum" : "0",
                "journalNum": "0"
            }

            var user = new models.User(user_json);
            user.save(function(err){
                if(err) console.error(err);
                console.log("created a new user" + user);

                var tmp = {name: req.body.first_name};
                req.session.user = tmp;
                res.send(200);
            });
        }
        else {
            console.log(result);
            console.log("existing user");

            var user = {name: req.body.first_name};
            req.session.user = user;
            res.send(200);
        }
    });

};