/**
 * Created by MuyBien on 1/31/16.
 */

var media = require('../media.json')

exports.viewJournal = function(req, res){
    res.render('journal');
};


exports.viewJournalBook = function(req, res){
    console.log("render journal_view");
    res.render('journal_view');
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
    res.render('manage_media', media);
};