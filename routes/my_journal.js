/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

exports.view = function(req, res){

    models.User.find(function(err, users) {
        if(err) return console.error(err);
        else return console.log("find users:" + users);

    });

    models.Journal.find(function (err, journals) {
        if (err) return console.error(err);

        res.render('my_journal', {'journals': journals, 'user': data["user"]});
        // console.log(journals);
    });

   //res.render('my_journal', data);
};
