/**
 * Created by MuyBien on 1/31/16.
 */

var journals = require('../journals.json');

exports.view = function(req, res){
    res.render('gallery', journals);
};