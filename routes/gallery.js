/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){
    models.Journal.find(function(err, journals){
        if(err) {console.log(err); res.send(500);}
        console.log(journals);
        res.render('gallery', {'journals' : journals});
    })
};