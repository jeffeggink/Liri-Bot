var twitterKeys = keys.twitterKeys;
var tmdbKey = keys.tmdbKey;
 console.log(twitterKeys.consumer_key);
 var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
@@ -28,6 +26,7 @@ var client = new Twitter({
 //-----------------------FUNCTIONS-----------------------------------------------
 //This function processes the input commands
function processCommands(command, commandParam){
 	switch(command){
@@ -37,7 +36,7 @@ function processCommands(command, commandParam){
	case 'spotify-this-song':
		spotifyThis(commandParam); break;
	case 'movie-this':
		movieThis(); break;
		movieThis(commandParam); break;
	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
@@ -96,31 +95,50 @@ function spotifyThis(song){
 }
 function movieThis(){
function movieThis(movieName){
 	request("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbKey + "&query=Jack+Reacher", function(error, response, body) {
	request("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbKey + "&query=" + movieName, function(error, response, body) {
   	// If there were no errors and the response code was 200 (i.e. the request was successful)...
  	if (!error && response.statusCode === 200) {
     // Then we print out the imdbRating
    //console.log(response.IncomingMessage.body.results);
	    console.log(JSON.parse(body).results[0]);
	    var movieObj = JSON.parse(body).results[0];
	    console.log("--------Title-----------");
	    console.log("--------Release Date-----------");
	    console.log("--------Rating-----------");
	    console.log("--------Produced in-----------");
	    console.log("--------Actors-----------");
	    console.log("--------Title-----------");
 	    var movieID =  movieObj.id;
	    console.log(movieID);
	    //console.log(JSON.parse(body).results[0]);
	    
	    //Get the Movie ID
	    var movieID =  JSON.parse(body).results[0].id;
	    //console.log(movieID);
 	    var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=8d5f41f6535c312ee8ea248cecd733f7";
	    //Create new query using the movie ID
	    var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + tmdbKey + "&append_to_response=credits,releases";
 	    request(queryURL, function(error, response, body) {
	    	console.log(JSON.parse(body));
	    	var movieObj = JSON.parse(body);
 	    	console.log("--------Title-----------");
	    	console.log(movieObj.original_title);
 	    	console.log("--------Year -----------");
	    	console.log(movieObj.release_date.substring(0,4));
 	   		console.log("--------Rating-----------");
	   		console.log(movieObj.releases.countries[0].certification);
 	   		console.log("--------Country Produced-----------");
	   		for(i=0, j = movieObj.production_countries.length; i<j; i++){
	   			console.log(movieObj.production_countries[i].name);
	   		}
	   		console.log("--------Languages-----------");
	   		for(i=0, j = movieObj.spoken_languages.length; i<j; i++){
	   			console.log(movieObj.spoken_languages[i].name);
	   		}
	   		console.log("--------Plot----------------");
	   		console.log(movieObj.overview);
 	   		console.log("--------Actors-----------");
	   		for(i=0, j = movieObj.credits.cast.length; i<j; i++){
	   			console.log(movieObj.credits.cast[i].name);
	   		}
	    	
	    });
 @@ -140,7 +158,6 @@ function doWhatItSays(){
 		var dataArr = data.split(',');
 		//console.log(spotifyThis(dataArr[1]));
		processCommands(dataArr[0], dataArr[1]);
	});
}