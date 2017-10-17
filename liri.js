var fs = require("fs");
var twitterKeys = require("./keys.js");
var spotifyKeys = require("./spotifyKeys.js");
// Take two arguments.
// The first will be te.he action (i. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.
var action = process.argv[2];
var value = process.argv[3];
// for (var i = 3; i < nodeArgs.length; i++) {

//     if (i > 3 && i < nodeArgs.length) {

//       movieName = movieName + "+" + nodeArgs[i];

//     }

//     else {

//       movieName += nodeArgs[i];


//     }
//   }


//let us initially create an api call for twitter and see what it does

switch (action) {
  case "my-tweets":
    logText();
    twitter();
    break;

  case "spotify-this-song":
    logText();
    spotify();
    break;

  case "movie-this":
    logText();
    omdbFunc();
    break;

  case "do-what-it-says":
    logText();
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
  var params = {
    screen_name: 'jalakamsairam'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (let i = 0; i < 10; i++) {
        console.log("######################################################################################");
        console.log("Tweet's date:    " + tweets[i].created_at + "    ");
        console.log("Tweet:    " + tweets[i].text + "    ");
        console.log("######################################################################################");
      }
    }
  });
}

function spotify() {
  if (value === undefined) {
    value = "starboy";
  }
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: "5d081c535fa7490991b26b08b37add99",
    secret: "2d258b3a25a9494d8ebccd7d509cab04"
  });
  console.log(value);
  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {

      return console.log('Error occurred: ' + err);
    }
    for (let i = 0; i < 5; i++) {
      console.log("#########################################################");
      console.log("The track's name is: " + data.tracks.items[i].name);
      console.log("The album's name is: " + data.tracks.items[i].album.name);
      console.log("The artist's name is: " + data.tracks.items[i].artists[0].name);
      console.log("find this song here:" + data.tracks.items[i].album.external_urls.spotify);
      console.log("#########################################################");
    }
  });


}

function omdbFunc() {
  if (value === undefined) {
    value = "Mr. Nobody";
  }
  var queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
  var request = require("request");
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // console.log(JSON.parse(body));
      console.log("################################################################################################");
      console.log("the movie name is: " + JSON.parse(body).Title);
      console.log("the movie released on : " + JSON.parse(body).Released);
      console.log("Rotten tomatoes rating  is: " + JSON.parse(body).Ratings[1].Value);
      console.log("the movie name is: " + JSON.parse(body).Title);
      console.log("the movie released in : " + JSON.parse(body).Language);
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
      console.log("plot: " + JSON.parse(body).Plot);
      console.log("The actors in the movie is: " + JSON.parse(body).Actors);

      console.log("################################################################################################");
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    
            if (error) {
                console.log(error);
            }
            var dataArr = data.split(",");
            action =dataArr[0];
            value = dataArr[1];
            spotify();
})
}

function logText() {
  if(action !=  undefined){
  var param = action + value;
  fs.appendFile("./log.txt", param+"\n", function (error) {
    if (error) {
      console.log(error);
    }
    console.log("log file updated");
  });
  }else{
    var errorString = new Date() + '\n' + 'ERROR: UNDEFINED ENTRY' + '\n' + '\n';
    fs.appendFile('log.txt', errorString, function(error) {
        if (error) {
            console.log(error)
        }
      })
  }
}

function spotifySearch(value) {
  
}