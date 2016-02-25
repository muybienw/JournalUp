var models = require('../models');

exports.checkUser = function(req, res){
    console.log("checking user:");
    //console.log(req);
    console.log(req.body);
    console.log(req.body.name);

    models.User.findOne({name: req.body.name}, function(err, user){
        if(err) console.log(err);

        console.log(user);

        if(user!=null) res.send(200);
        else {
            console.log('no such user!');
            res.send(500);
        }
    });
}