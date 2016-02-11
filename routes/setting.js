/**
 * Created by MuyBien on 2/9/16.
 */

var data = require('../data.json');
exports.viewSetting = function(req, res){
    res.render('setting', data);
};