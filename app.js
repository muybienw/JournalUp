
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
var multer = require('multer');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
//var local_database_name = 'journalup';
//var local_database_uri  = 'mongodb://localhost/' + local_database_name
//var database_uri = process.env.MONGOLAB_URI || local_database_uri
//mongoose.connect(database_uri);

var heroku_database_uri = 'mongodb://muybienw:w1234@ds055565.mongolab.com:55565/heroku_bdgwnq5z?authMode=scram-sha1'
var database_uri = heroku_database_uri;

mongoose.connect(heroku_database_uri);


// Example route
// var user = require('./routes/user');

var myjournal = require('./routes/my_journal');
var signin = require('./routes/signin');
var gallery = require('./routes/gallery');
var journal = require('./routes/journal');
var favorite = require('./routes/favorite');
var setting = require('./routes/setting');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// Add routes here
app.get('/', signin.signIn);
app.get('/signup', signin.signUp);
app.get('/myjournal', myjournal.view);
app.get('/gallery', gallery.view);
app.get('/favorite', favorite.view);
app.get('/journal/:id', journal.viewJournal);
app.get('/newjournal', journal.addJournal);
app.get('/journal/:id/edit', journal.editJournal);
//app.get('/journal/:id/share', journal.shareJournal);
app.get('/journal/:id/media', journal.manageMedia);

// create a new journal
//app.get('/createjournal', journal.createJournal)
app.get('/setting', setting.viewSetting);
app.get('/change_setting', setting.changeSetting);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/login/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/myjournal',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  //req.logout();
  req.session.destroy(); 
  res.redirect('/');
});

//app.post('/journal/new_test_journal', journal.addTestJournal);
app.post('/journal/:id/delete', journal.deleteJournal);
app.post('/journal/:id/favorite', journal.toggleFavorite);


// upload a picture

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

app.post('/change_setting', upload.single('image'), setting.changeSetting);
app.post('/createjournal', upload.single('image'), journal.createJournal);
app.post('/journal/save_edit_changes', upload.single('image'), journal.saveEditChanges);
app.post('/add_image', upload.single('image'), journal.addImageToJournal);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//authenticate requests
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 184120325287137,
    clientSecret: "68bbd4ff48fbd535166dabe8536bf330",
    callbackURL: "http://journalup.herokuapp.com/myjournal"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));