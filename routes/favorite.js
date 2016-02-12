/**
 * Created by MuyBien on 2/9/16.
 */

var data = require('../data.json')


exports.view = function(req, res){
    var favs = data["user"]["favorites"];
    console.log(favs);
    var fs = [];
    for(var i=0; i<favs.length; i++){
        fs[i] = data["journals"][parseInt(favs[i])];
    }

    console.log(fs);
    console.log({"favs": fs});


    res.render('my_favorite', {"favs": fs});
};