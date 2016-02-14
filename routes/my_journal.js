/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){

    models.User.find().populate('journals').populate('favorites').exec(function(err, result){
        if (err) return console.error(err);
        res.render('my_journal', {'journals': result[0]['journals'], 'user':result[0]});
    });


   //res.render('my_journal', data);

    //function tmp(err, res){
    //
    //    console.log(res);
    //    console.log(res[0]["journals"]);
    //    console.log(res[0]["name"]);
    //}
};
