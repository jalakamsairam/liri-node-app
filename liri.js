var fs = require("fs");
var twitterKeys = require("./keys.js");
// Take two arguments.
// The first will be te.he action (i. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];

//let us initially create an api call for twitter and see what it does

switch (action) {
    case "my-tweets":
    twitter();
      break;
  
    case "spotify-this-song":
      spotify();
      break;
  
    case "movie-this":
      omdbFunc();
      break;
  
    case "do-what-it-says":
      doWhatItSays();
      break;
  }
  
function twitter() {
  var Twitter = require('twitter');
  
 var client = new Twitter({
   consumer_key: twitterKeys.consumer_key,
   consumer_secret: twitterKeys.consumer_secret,
   access_token_key: twitterKeys.access_token_key,
   access_token_secret: twitterKeys.access_token_secret
 });
  var params = { screen_name: 'jalakamsairam' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for(let i = 0 ; i < 10 ; i++ ){
      console.log("######################################################################################");
      console.log("Tweet's date:    "+tweets[i].created_at+"    ");
      console.log("Tweet:    "+tweets[i].text+"    ");
      console.log("######################################################################################");
    }
  }
  });
}

  function spotify(){
    var Spotify = require('node-spotify-api');
    
   var spotify = new Spotify({
     id:"5d081c535fa7490991b26b08b37add99",
     secret: "2d258b3a25a9494d8ebccd7d509cab04"
   });
    
   spotify.search({ type: 'track', query: value }, function(err, data) {
     if (err) {
       return console.log('Error occurred: ' + err);
     }
    
   console.log(data.tracks.items[0]); 
   });
  }

  function omdbFunc() {
    var queryURL = "http://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=40e9cece";
    var request = require("request");
    request(queryURL, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      }
    });
  }

  function doWhatItSays(){

  }