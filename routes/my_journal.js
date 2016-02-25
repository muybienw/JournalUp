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
        console.log(req.session.user);

        var searchOption = {"name": req.session.user.name}
        console.log(searchOption);

        models.User.findOne(searchOption).populate('journals').sort({createdAt: -1}).exec(function (err, result) {
            if (err) return console.error(err);

            var list = result['journals'];
            //console.log(list);

            function compare(a, b) {
                //console.log("compare:" )
                //console.log(a.createdAt);
                //console.log(b.createdAt);
                //console.log(b.createdAt - a.createdAt);
                //console.log();

                return b.createdAt - a.createdAt;
            }

            //console.log();
            //console.log();
            //console.log();

            list.sort(compare);
            //console.log(list);

            res.render('my_journal', {
                'journals': result['journals'], 'user': result,
                helpers: {
                    formatDate: function (datetime) {
                        var date = new Date(datetime);
                        var options = {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            //hour: "2-digit",
                            //minute: "2-digit"
                        };

                        return date.toLocaleDateString("en-US", options);
                    }
                }
            });
        });
    }


   //res.render('my_journal', data);

    //function tmp(err, res){
    //
    //    console.log(res);
    //    console.log(res[0]["journals"]);
    //    console.log(res[0]["name"]);
    //}
};
