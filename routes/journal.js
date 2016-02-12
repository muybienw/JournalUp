/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');


// db models
var models = require('../models');

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
    res.render('journal_view', data["journals"][index]);
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

exports.createJournal = function(req, res) {    
    // Your code goes here
    id = data["journals"].length;
    title = req.query.title;
    time = req.query.startdate;
    collaborators = req.query.collaborators.split();
    description = req.query.description;
    
    newJournal = {
        "id" : id,
        "title": title,
        "time": time,
        "collaborators" : collaborators,
        "description": description,
        "coverImage": "/images/jenny.jpg" ,
        "images": [
        "/images/ny.jpg",
        "/images/jenny.jpg"
    ]
    }
    data["journals"].push(newJournal);
    res.render('my_journal', data);
 }

// add test journal
exports.addTestJournal = function(req, res) {

    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    //console.log(form_data);
    //console.log(form_data['project_title']);

    // make a new Project and save it to the DB
    // YOU MUST send an OK response w/ res.send();

    var newTestJournal = new models.Journal({
        'title': "San Diego",
        'date': new Date("Feb 2016"),
        'summary': "where UCSD is located",
        'coverImage': "/images/antlope.jpg",
        'collaborators': ["Silvia", "Jenny"],
        'images': ["/images/tree.jpg"]
    });



    newTestJournal.save(function(err){
        if(err) console.log(err);
        console.log("Success! new journal added");
        res.send(200);
    });

}