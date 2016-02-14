/**
 * Created by MuyBien on 2/9/16.
 */

var data = require('../data.json');
var models = require('../models');


exports.view = function(req, res){

    models.User.find().populate('journals').populate('favorites').exec(function(err, result){
        if (err) return console.error(err);
        res.render('my_favorite', {'favs': result[0]["favorites"]});
    });

    //var favs = data["user"]["favorites"];
    //console.log(favs);
    //var fs = [];
    //for(var i=0; i<favs.length; i++){
    //    fs[i] = data["journals"][parseInt(favs[i])];
    //}
    //
    //console.log(fs);
    //console.log({"favs": fs});
    //
    //
    //res.render('my_favorite', {"favs": fs});
};