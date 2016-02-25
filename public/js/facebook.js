var models = require('../models');

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('Facebook login status changed.');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    FB.api('/me?fields=name,first_name,picture.width(480)', getUserInfo);
  }
}

function getUserInfo(response) {
  console.log("AFTER FB LOGIN:");
  console.log("id: " + response.id);
  console.log("name: " + response.name);
  console.log("first name: " + response.first_name);
  console.log(response.picture.data.url);

  var data = {
    "id": response.id,
    "name" : response.name,
    "first_name" : response.first_name,
    "profilePicUrl" : response.picture.data.url
  };

  $.post('/fbsignin', data , function(){
    window.location.replace('/myjournal');
  });
}