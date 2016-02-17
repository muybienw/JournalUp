/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

// search option for only one user
var search = {'name' : 'Mubin'};

exports.viewJournal = function(req, res){

    var id = req.params.id;
    models.User.find(function(err, user){
        if(err) {console.log(err); res.send(500);}

        models.Journal.findOne({'_id' : id}).exec(function(err, journal){
            if(err) {console.log(err); res.send(500);}
            console.log(user);

            var isFav = user[0]["favorites"].indexOf(journal["_id"])==-1? false : true;
            console.log("this article is of favorite:" + isFav);

            res.render('journal_view', {"journal" : journal, "user" : user[0], "isFav" : isFav,
                    helpers: {
                        foo: function () { return 'foo.'; },
                        ifIn: function(elem, list, options) {
                            if(list.indexOf(elem) > -1) {
                                return options.fn(this);
                            }
                            return options.inverse(this);
                        }
                    }
            });
        });
    });



    //console.log(id);
    //
    //var index = 0;
    //
    //for (var i in data["journals"]) {
    //    console.log(i);
    //    console.log(data["journals"][i]["id"]);
    //
    //    if (data["journals"][i]["id"] == id) {
    //        index = i;
    //        console.log("profile index is : " + i);
    //        break;
    //    }
    //}
    //res.render('journal_view', data["journals"][index]);
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

    models.Journal.findOne({_id : req.params.id}, function(err, journal){
        if(err) console.log(err);
        res.render('edit_journal', journal);
    });
};
//
//exports.shareJournal = function(req, res){
//    var id = req.params.id;
//    console.log(id);
//
//    var index = 0;
//
//    for (var i in data["journals"]) {
//        console.log(i);
//        console.log(data["journals"][i]["id"]);
//
//        if (data["journals"][i]["id"] == id) {
//            index = i;
//            console.log("profile index is : " + i);
//            break;
//        }
//    }
//
//    res.render('share', data["journals"][index]);
//};

exports.manageMedia = function(req, res){
    var id = req.params.id;
    models.Journal.findOne({_id : req.params.id}, function(err, journal){
        if(err) console.log(err);
        res.render('manage_media', journal);
    });
};

exports.createJournal = function(req, res) {    
    // Your code goes here
    //var id = data["journals"].length;
    var title = req.body.title;
    //var time = req.body.startdate;
    var collaborators = req.body.collaborators.split();
    var description = req.body.description;
    var coverImage = req.file ? req.file.path.substring(6) : "/images/jenny.jpg";
    
    var newJournal_json = {
        //"id" : id,
        "title": title,
        //"time": time,
        "collaborators" : collaborators,
        "description": description,
        "coverImage": coverImage,
        "images": [
        "/images/ny.jpg",
        "/images/jenny.jpg"
        ]
    }

    var newJournal = new models.Journal(newJournal_json);

    newJournal.save(function(err){
        if(err) {console.log(err); res.send(500);}

        console.log(newJournal);

        models.User.findOne(search, function(err, user){
            if(err) console.log(err);
            user.journals.push(newJournal._id);

            console.log(newJournal._id);
            console.log(user);

            models.User.findOneAndUpdate({_id: user._id}, {$set:{journals: user.journals}}, {upsert : true}, function(err, doc){
                if(err) {console.error(err); res.send(500);}
                console.log("success!");
                res.redirect('/myjournal');
            });
        });

    });

    //var JournalSchema = new Mongoose.Schema({
    //    // fields are defined here
    //    'id': String,
    //    'title': String,
    //    'time': String,
    //    'description': String,
    //    'coverImage': String,
    //    'collaborators': [String],
    //    'images': [String]
    //});

    //data["journals"].push(newJournal);
    //res.render('my_journal', data);
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

exports.deleteJournal = function(req, res){
    var journalID = req.params.id;

    // find the project and remove it
    // YOU MUST send an OK response w/ res.send();

    models.Journal.find({"_id" : journalID}).remove().exec(function(err){
        if(err) console.log(err);
        res.send(200);
    });
}

exports.toggleFavorite = function(req, res){
    var journalID = req.params.id;

    models.User.find(function(err, user){
        if(err) {console.error(err); res.send(500);}
        models.Journal.findOne({"_id" : journalID}).exec(function(err, journal){
            if(err) {console.error(err); res.send(500);}

            // console.log(user[0]["favorites"]);

            var index = user[0]["favorites"].indexOf(journal._id);
            // console.log(index);
            // console.log(journal._id);

            //delete user[0]["favorites"][index];
            //console.log("test");

            if(index == -1) user[0]["favorites"].push(journal._id + "");
            else user[0]["favorites"].splice(index, 1);

            //delete user[0]["_id"];

            //console.log(user[0]);

            models.User.findOneAndUpdate({_id: user[0]._id}, {$set:{favorites:user[0]["favorites"]}}, {upsert : true}, function(err, doc){
                if(err) {console.error(err); res.send(500);}
                console.log("success!");
                res.send(200);
            });

        });
    });
}

exports.saveEditChanges = function(req, res){

    console.log(req.body);

    console.log(req.file);
    console.log("journal id is :" + req.body.journal_id);

    models.Journal.findOne({_id : req.body.journal_id}, function(err, journal){
        if(err) console.log(err);
        var title = req.body.title ?  req.body.title : journal.title;
        var collaborators = req.body.collaborators ? req.body.collaborators.split() : journal.collaborators;
        var description = req.body.description? req.body.description : journal.description;
        var coverImage = req.file ? req.file.path.substring(6) : journal.coverImage;

        var update = {
            "title": title,
            "collaborators" : collaborators,
            "description": description,
            "coverImage": coverImage,
        }

        models.Journal.findOneAndUpdate({_id: journal._id}, {$set: update}, function(err){
            if(err) console.log(err);
            console.log("after update:" + journal);
            res.redirect('/journal/' + journal._id);
        });
    });
}

exports.addImageToJournal = function(req, res){
    console.log(req.body);
    console.log("journal id is :" + req.body.journal_id);

    models.Journal.findOne({_id: req.body.journal_id}, function(err, journal){
        if(err) console.log(err);
        if(!req.file) res.redirect('/journal/' + req.body.journal_id + '/media');

        console.log(journal);

        journal.images.push(req.file.path.substring(6));

        models.Journal.findOneAndUpdate({_id: journal._id}, {$set: {"images" : journal.images}}, function(err){
            if(err) console.log(err);
            res.redirect('/journal/' + req.body.journal_id + '/media');
        });

    });
}