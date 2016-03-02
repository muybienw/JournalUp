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
        models.Journal.find().sort({createdAt: -1}).limit(6).exec(function (err, journals) {
            if (err) {
                console.log(err);
                res.send(500);
            }
            //console.log(journals);
            res.render('gallery', {'journals': journals});
        })
    }
};

exports.viewSearch = function(req, res){

    var search = req.params.search;

    console.log(search);

    if(search.length==0) res.redirect('/gallery');
    else{

        try {
            var tt = new RegExp(search, "i")
        }
        catch(e){
            console.log(e);
            res.render('gallery', {'journals': []});
        }
        var searchOption = {title: tt};
        models.Journal.find(searchOption).sort({createdAt: -1}).limit(6).exec(function (err, journals) {
            if (err) {
                console.log(err);
                res.send(200);
            }
            //console.log(journals);
            res.render('gallery', {'journals': journals});
        })
    }

};