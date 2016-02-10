/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');

exports.view = function(req, res){
    res.render('gallery', data);
};