/**
 * Created by MuyBien on 1/31/16.
 */

exports.signIn = function(req, res){
    var user = {
        id : 0,
        name : "Mubin",
        password : 1234
    }

    req.session.user = user;
    console.log(req.session);

    res.render('signin');
};

exports.signUp = function(req, res){
    res.render('signup');
};