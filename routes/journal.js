/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');

exports.viewJournal = function(req, res){

    var id = req.params.id;
    console.log(id);

    var index = 0;

    for (var i in data["journals"]) {
        console.log(i);
        console.log(data["journals"][i]["id"]);

        if (data["journals"][i]["id"] == id) {
            index = i;
            console.log("profile index is : " + i);
            break;
        }
    }
    res.render('journal', data["journals"][index]);
};


exports.viewJournalBook = function(req, res){
    console.log("render journal_view");
    res.render('journal_view');
};

exports.addJournal = function(req, res){
    res.render('new_journal');
};

exports.editJournal = function(req, res){
    var id = req.params.id;
    console.log(id);

    var index = 0;

    for (var i in data["journals"]) {
        console.log(i);
        console.log(data["journals"][i]["id"]);

        if (data["journals"][i]["id"] == id) {
            index = i;
            console.log("profile index is : " + i);
            break;
        }
    }

    res.render('edit_journal', data["journals"][index]);
};

exports.shareJournal = function(req, res){
    var id = req.params.id;
    console.log(id);

    var index = 0;

    for (var i in data["journals"]) {
        console.log(i);
        console.log(data["journals"][i]["id"]);

        if (data["journals"][i]["id"] == id) {
            index = i;
            console.log("profile index is : " + i);
            break;
        }
    }

    res.render('share', data["journals"][index]);
};

exports.manageMedia = function(req, res){
    var id = req.params.id;
    console.log(id);

    var index = 0;

    for (var i in data["journals"]) {
        console.log(i);
        console.log(data["journals"][i]["id"]);

        if (data["journals"][i]["id"] == id) {
            index = i;
            console.log("profile index is : " + i);
            break;
        }
    }

    res.render('manage_media', data["journals"][index]);
};