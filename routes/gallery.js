/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
    if(!req.session.user) {
        res.redirect('/');
    }
    else {
        models.Journal.find(function (err, journals) {
            if (err) {
                console.log(err);
                res.send(500);
            }
            console.log(journals);
            res.render('gallery', {'journals': journals});
        })
    }
};

exports.viewSearch = function(req, res){

    var search = req.params.search;

    console.log(search);

    if(search.length==0) res.redirect('/gallery');
    else{
        var searchOption = {title: new RegExp(search, "i")};
        models.Journal.find(searchOption, function (err, journals) {
            if (err) {
                console.log(err);
                res.send(500);
            }
            console.log(journals);
            res.render('gallery', {'journals': journals});
        })
    }

};