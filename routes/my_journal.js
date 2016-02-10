/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){

    console.log(models.Journal.find().length);

    res.render('my_journal', data);
};
