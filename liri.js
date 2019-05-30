//Read and set any environment variables with the dotenv package:
require("dotenv").config();
//We use the require keyword to access all of the keys in the keys.js file
var keys = require("./keys.js");
//We use the require keyword to use the "fs" NPM module to read, write, and append the random.txt file.
var fs = require("fs");
//We use the require keyword to use the "axios" NPM module to retrieve the data from the the Bands in Town and OMDB APIs.
var axios = require("axios");
//We use the require keyword to use the "moment" NPM module to change the date view of the data received from the Bands In Town API.
var moment =require("moment");
//We use the require keyword to use the "spotifyAPI" NPM module to retrieve the data from the the Spotify API.
var Spotify= require("node-spotify-api");
//We retrieve the API keys for Spotify, OMBD, and Bands In Town from keys.js
var spotify = new Spotify(keys.spotify);
//var ombd = new OMBD(keys.ombd);
//var bandsInTown = new BANDSINTOWN(keys.bandsintown);


//We require variables to capture user inputs
var command = process.argv[2];
var userInput = process.argv[3];


//If the liri command is spotify-this-song, run the spotifyThis() Funtion to output the song info.
if (command === "spotify-this-song") {
  spotifyThis();
}
//If the liri command is movie-this, run the movieThis() Funtion to output the movie info.
else if (command === "movie-this") {
  movieThis();
}
//If the liri command is concert-this, run the concertThis() Funtion to output the concert info.
else if (command === "concert-this") {
  concertThis();
}
//If the liri command is do-what-it-says, run the doWhatItSays() Funtion to take the text inside of random.txt and use it to run spotify-this-song for "I want it that way".
else if (command === "do-what-it-says") {
  doWhatItSays();
}
//If the liri command is not available, notify the user that the command was not found.
else {
  console.log("Please only use one of these commands: \nspotify-this-song \nmovie-this \nconcert-this \ndo-what-it-says");
}




//node-spotify-api function to run a request to the Spotify API with the song specified.  If no song is typed, it defaults to "The Sign" by Ace of Base
function spotifyThis() {
  if(!userInput) {
      userInput = 'Ace of Base, The Sign';
  }
  spotify
  .search({ type: 'track', query: userInput })
  .then(function(response) {
    for (var i = 0; i < 5; i++) {
      var spotResults = 
      "--------------------------SPOTIFY RESULT-----------------------------" +
      "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
      "\nSong Name: " + response.tracks.items[i].name +
      "\nAlbum Name: " + response.tracks.items[i].album.name +
      "\nPreview Link: " + response.tracks.items[i].preview_url;
      console.log(spotResults);
    }
  })
  .catch (function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } 
    else {
      // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
  }); 
}




//axios function to run a request to the OMDB API with the movie specified.  If no movie is typed, it defaults to "Mr.Nobody"
function movieThis() {
  if (!userInput) {
    userInput = "mr nobody";
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  }
  axios.get("https://www.omdbapi.com/?t="+ userInput +"&y=&apikey="+ "ad9dc4fd" +"&plot=short")
    .then(function(response) {
      var movie =
        "----------------------------OMBD RESULT-------------------------------" +
        "\nMovie Title: " + response.data.Title +
        "\nYear of Release: " + response.data.Year +
        "\nIMDB Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors/Actresses: " + response.data.Actors +
        "\n--------------------------------------------------------------------"
        console.log(movie);
    })
    .catch (function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
        console.log("---------------Data-----------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } 
    else {
      // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
  });
}




//axios function to run a request to the Bands In Town API with the artist specified.  If no artist is typed, it defaults to "Mr.Nobody"
function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
  .then(function(response) {    
    for (var i = 0; i < response.data.length; i++) {
      //Save the datetime key response into a variable
      var datetime = response.data[i].datetime;      
      var results = 
        "-----------------------Bands In Town RESULT--------------------------" +
        "\nVenue Name: " + response.data[i].venue.name + 
        "\nVenue Location: " + response.data[i].venue.city +
        "\nDate of the Event: " + moment(datetime).format("MMMM Do YYYY");
        console.log(results);
        "\n--------------------------------------------------------------------"
      }
  })
  .catch (function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
    } 
    else {
      // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
    }
    console.log(error.config);
  }); 
}



//function to read and assist in identifing issues with the other API's.  If this function is ran without a parameter, we end up with the sample search of "I want it that way".....Omar's fav!!!!
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      logThis(err);
    }
    var randomtxtArray = data.split(",");
    userInput = randomtxtArray[1];
    spotifyThis(userInput);
  })
};