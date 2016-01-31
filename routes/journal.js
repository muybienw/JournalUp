/**
 * Created by MuyBien on 1/31/16.
 */

exports.viewJournal = function(req, res){
    res.render('journal');
};

exports.addJournal = function(req, res){
    res.render('new_journal');
};

exports.editJournal = function(req, res){
    res.render('edit_journal');
};

exports.shareJournal = function(req, res){
    res.render('share');
};

exports.manageMedia = function(req, res){
    res.render('manage_media');
};