/**
 * Created by MuyBien on 1/31/16.
 */

var data = require('../data.json');
var models = require('../models');

// search option for only one user


exports.viewJournal = function(req, res){

    console.log(req.session.user);

    var searchOption = {"name": req.session.user.name}
    console.log(searchOption);

    var id = req.params.id;

    models.User.findOne(searchOption, function(err, user){
        if(err) {console.log(err); res.send(500);}

        models.Journal.findOne({'_id' : id}).exec(function(err, journal){
            if(err) {console.log(err); res.send(500);}
            console.log(user);

            var isFav = user["favorites"].indexOf(journal["_id"])==-1? false : true;
            console.log("this article is of favorite:" + isFav);

            var isCollaborator = journal.collaborators.indexOf(user.name)==-1? false : true;
            console.log("is creator: " + isCollaborator);

            console.log(req.session.user.id);
            var id = req.session.user.id;
            var lastBit = id.charAt(id.length-1) - '0';

            //render version A
            if(lastBit % 2 == 0){

                console.log("render journal view version A");

                res.render('journal_view', {"journal" : journal, "user" : user[0], "isFav" : isFav, "isCollaborator" : isCollaborator,
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
            }

            //render version B
            else{
                console.log("render journal view version B");

                res.render('journal_view2', {"journal" : journal, "user" : user[0], "isFav" : isFav, "isCollaborator" : isCollaborator,
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
            }


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


//exports.viewJournalBook = function(req, res){
//    console.log("render journal_view");
//    res.render('journal_view');
//};

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

    console.log("check create journal data");
    console.log(req.body);
    console.log(req.session.user.name);
    var collaborators = req.body.collaborators.split(',');
    console.log(typeof collaborators);

    if(collaborators.indexOf(req.session.user.name)==-1) collaborators.push(req.session.user.name);

    var description = req.body.description;
    var coverImage = req.file ? req.file.path.substring(6) : "/images/jenny.jpg";
    
    var newJournal_json = {
        //"id" : id,
        "title": title,
        //"time": time,
        "collaborators" : collaborators,
        "description": description,
        "coverImage": coverImage,
        "images": []
    }

    var newJournal = new models.Journal(newJournal_json);

    newJournal.save(function(err){
        if(err) {console.log(err); res.send(500);}

        console.log(newJournal);

        var userLeft = collaborators.length;

        for(var i=0; i<collaborators.length; i++){
            var user_name = collaborators[i];
            console.log("current user to add journal is:" + user_name);

            models.User.findOne({name: user_name}, function(err, user){
                console.log(user);

                user.journals.push(newJournal._id);

                models.User.findOneAndUpdate({_id: user._id}, {$set:{journals: user.journals}}, {upsert : true}, function(err, doc){
                    if(err) {console.error(err); res.send(500);}
                    console.log("success!" + userLeft + " to go");
                    userLeft--;

                    if(userLeft<=0) res.redirect('/myjournal');
                });

            });
        }

        //var searchOption = {name : req.session.user.name};
        //
        //models.User.findOne(searchOption, function(err, user){
        //    if(err) console.log(err);
        //    user.journals.push(newJournal._id);
        //
        //    console.log(newJournal._id);
        //    console.log(user);
        //
        //    models.User.findOneAndUpdate({_id: user._id}, {$set:{journals: user.journals}}, {upsert : true}, function(err, doc){
        //        if(err) {console.error(err); res.send(500);}
        //        console.log("success!");
        //        res.redirect('/myjournal');
        //    });
        //});

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
//exports.addTestJournal = function(req, res) {
//
//    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
//    //console.log(form_data);
//    //console.log(form_data['project_title']);
//
//    // make a new Project and save it to the DB
//    // YOU MUST send an OK response w/ res.send();
//
//    var newTestJournal = new models.Journal({
//        'title': "San Diego",
//        'date': new Date("Feb 2016"),
//        'summary': "where UCSD is located",
//        'coverImage': "/images/antlope.jpg",
//        'collaborators': ["Silvia", "Jenny"],
//        'images': ["/images/tree.jpg"]
//    });
//
//
//    newTestJournal.save(function(err){
//        if(err) console.log(err);
//        console.log("Success! new journal added");
//        res.send(200);
//    });
//
//}

exports.deleteJournal = function(req, res){
    var journalID = req.params.id;

    // find the project and remove it
    // YOU MUST send an OK response w/ res.send();

    models.Journal.find({"_id" : journalID}).remove().exec(function(err){
        console.log("journal removed");
        if(err) console.log(err);
        res.send(200);
    });
}

exports.toggleFavorite = function(req, res){
    var journalID = req.params.id;

    console.log(req.session.user);

    var searchOption = {"name": req.session.user.name}
    console.log(searchOption);

    models.User.findOne(searchOption, function(err, user){
        if(err) {console.error(err); res.send(500);}
        models.Journal.findOne({"_id" : journalID}).exec(function(err, journal){
            if(err) {console.error(err); res.send(500);}

            // console.log(user[0]["favorites"]);

            var index = user["favorites"].indexOf(journal._id);
            // console.log(index);
            // console.log(journal._id);

            //delete user[0]["favorites"][index];
            //console.log("test");

            if(index == -1) user["favorites"].push(journal._id + "");
            else user["favorites"].splice(index, 1);

            //delete user[0]["_id"];

            //console.log(user[0]);

            models.User.findOneAndUpdate({_id: user._id}, {$set:{favorites:user["favorites"]}}, {upsert : true}, function(err, doc){
                if(err) {console.error(err); res.send(500);}
                console.log("success!");
                res.send(200);
            });

        });
    });
}

exports.saveEditChanges = function(req, res){

//    console.log(req.body);

//    console.log(req.file);
//    console.log("journal id is :" + req.body.journal_id);

    models.Journal.findOne({_id : req.body.journal_id}, function(err, journal){
        if(err) console.log(err);

        var title = req.body.title ?  req.body.title : journal.title;
        var collaborators = req.body.collaborators ? req.body.collaborators.split(',') : journal.collaborators;
        var description = req.body.description? req.body.description : journal.description;
        var coverImage = req.file ? req.file.path.substring(6) : journal.coverImage;

        console.log(collaborators);

        var update = {
            "title": title,
            "collaborators" : collaborators,
            "description": description,
            "coverImage": coverImage,
        }

        models.Journal.findOneAndUpdate({_id: journal._id}, {$set: update}, function(err, journal){

            var userChange = [];

            for(var i=0; i<collaborators.length; i++) {
                var user_name = collaborators[i];
                if (journal.collaborators.indexOf(user_name) == -1) userChange.push(user_name);
            }

            for(var i=0; i<journal.collaborators.length; i++) {
                var user_name = journal.collaborators[i];
                if (collaborators.indexOf(user_name) == -1) userChange.push(user_name);
            }

            var userToChange = userChange.length;

            console.log("to change users:" + userChange);

            if(userToChange == 0 ) res.json({success : true});
            else {

                for (var i = 0; i < userChange.length; i++) {
                    console.log(userChange[i]);

                    models.User.findOne({name: userChange[i]}, function (err, user) {
                        if(!user) res.send(200);

                        console.log(user)

                        if (user.journals.indexOf(journal._id)==-1) user.journals.push(journal._id);
                        else user.journals.splice(user.journals.indexOf(journal._id), 1);

                        models.User.findOneAndUpdate({name: user.name}, {$set: {journals: user.journals}},
                            function (err, journal) {
                                userToChange--;
                                console.log("changed a new collaborator, " + userToChange + "to go");

                                if (userToChange <= 0) {
                                    res.json({success: true});
                                }
                            });
                    })
                }
            }

//            if(err) console.log(err);
////            console.log("after update:" + journal);
//            res.json({success: true});
        });
    });
}

exports.addImageToJournal = function(req, res) {
    console.log(req.body);
    console.log(req.file);
    console.log("journal id is :" + req.body.journal_id);

    if (!req.file) {
        console.log("no file attached!");
        res.json({error: "please select a file!"});
    }
    else {
        models.Journal.findOne({_id: req.body.journal_id}, function (err, journal) {
            if (err) console.log(err);

            console.log(journal);

            journal.images.push(req.file.path.substring(6));

            models.Journal.findOneAndUpdate({_id: journal._id}, {$set: {"images": journal.images}}, function (err) {
                if (err) console.log(err);
                //res.redirect('/journal/' + req.body.journal_id + '/media');
                res.json({success: true});
            });

        });
    }
}

exports.deleteImage = function(req, res){

    console.log("inside deleteImage function call");

    console.log(req.body);

    models.Journal.findOne({_id : req.body.journal_id}, function(err, journal){
        if(err || !journal) res.send(500);

        console.log(journal.images);
        journal.images.remove(req.body.imageUrl);
        console.log(journal.images);

        models.Journal.findOneAndUpdate({_id : req.body.journal_id}, {$set: {"images": journal.images}}, function(err){
            res.send(200);
        });

    })
}
