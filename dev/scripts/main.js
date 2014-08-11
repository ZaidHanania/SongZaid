var app = {
	playlist:"",
	artist: "",
	track: "",
	preartist: "",
	YT: "",
	played: [],
	liked: [],
	id: "",
	prevPlay: [],
	src: "",
	playingPreviousPlaylists: false,
	randomNum: function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	begin: function(){

		app.danceMin = app.danceMin / 100;
		app.danceMax =  app.danceMax / 100;
		app.energyMin = app.energyMin / 100;
		app.energyMax = app.energyMax / 100;

		$('svg').fadeIn();

		for(var i=0; i<app.prevPlay.length; i++){
			$('nav.right ul').append('<li class="playlist">' + app.prevPlay[i] + '</li>');
		}
		$('nav.right ul').append('<li class="playlist">' + app.playlist + '</li>');
		$('nav.right ul').append('<li class="createNew">' + 'Create New Playlist' + '</li>');

		$('.createNew').on('click', function(){
			window.location.reload();
		});

		$('.like').on('click', function(){
			$('.button').prop('disabled', true);
			app.addLike();
			app.respond();
		});

		$('.dislike').on('click', function(){

			$('.button').prop('disabled', true);
			app.respond();
		});


		$('.playlist').on('click', function(){
			var pName = $(this).text();
			if(pName)
				app.playback(pName);
		});

		app.menu();
		$.ajax({
			// url: 'http://ws.audioscrobbler.com/2.0/?format=json&method=chart.getTopTracks&api_key=f3901a0e169d1ce48b125d5d90081798',
			url: 'http://developer.echonest.com/api/v4/song/search?api_key=H7D4YTJNEGPOY2DSP&format=json&results=100&song_min_hotttnesss=0.7&artist_min_hotttnesss=0.3&min_energy=' + app.energyMin + '&min_danceability=' + app.danceMin + '&max_energy=' + app.energyMax + '&max_danceability=' + app.danceMax,
			type: 'GET',
			dataType: 'json',
			success: function(response){
				console.log(response);
				app.firstResponse(response);
				app.findYT();
			}
		});
	},
	firstResponse: function(response){
		app.preartist = app.artist;
		do{
		var random = app.randomNum(0,response.response.songs.length-1);
		if(response.response.songs[random].title)
			app.track = response.response.songs[random].title;

		app.track = app.track.charAt(0).toUpperCase() + app.track.substring(1);
		app.track = app.track.replace(/\s*\(.*?\)\s*/g, '').replace(' & ', ' and ');
		app.track = app.track.replace(/\s*\(.*?\)\s*/g, '').replace('&', ' and ');

		app.artist = app.artist.charAt(0).toUpperCase() + app.artist.substring(1);

		app.artist = response.response.songs[random].artist_name;
		}while(app.artist === app.preartist|| app.checkPlay());


		$('.track').html(app.track);
		$('.artist').html('by ' + app.artist);

	},

	respond: function(){

		$.ajax({
			// url: 'http://ws.audioscrobbler.com/2.0/?format=json&method=chart.getTopTracks&api_key=f3901a0e169d1ce48b125d5d90081798',
			url: 'http://developer.echonest.com/api/v4/song/search?api_key=H7D4YTJNEGPOY2DSP&format=json&results=100&song_min_hotttnesss=0.7&artist_min_hotttnesss=0.3&min_energy=' + app.energyMin + '&min_danceability=' + app.danceMin + '&max_energy=' + app.energyMax + '&max_danceability=' + app.danceMax,
			type: 'GET',
			dataType: 'json',
			success: function(response){
				app.firstResponse(response);
				app.findYT();
			}
		});

	},
	// likeResponse: function(response){

	// 	if(response.error){
	// 	 console.log("ERRORRRR");
	// 	 app.like();
	// 	}
	// 	var match;
	// 	var random;
	// 	var playcount;
	// 	app.preartist = app.artist;
	// 	do{
	// 		if(!response.similartracks.track)
	// 			app.like();
	// 		random = app.randomNum(0,50);
	// 		if(response.similartracks.track[random].playcount)
	// 			playcount = Number(response.similartracks.track[random].playcount);
	// 		if(response.similartracks.track[random].match)
	// 			match = Number(response.similartracks.track[random].match);
	// 		else
	// 			continue;
	// 		if(response.similartracks.track[random].artist.name)
	// 			app.artist = response.similartracks.track[random].artist.name;
	// 		else
	// 			continue;
	// 		}while(match < 0.3 || playcount < 7000 || app.artist === app.preartist|| app.checkPlay());

	// 	if(response.similartracks.track[random].name)
	// 		app.track = response.similartracks.track[random].name;
	// 	else
	// 		app.track = response.similartracks.track[random].track;
		
	// 	$('.track').html(app.track);
	// 	$('.artist').html('by ' + app.artist);

	// },
	// like: function(){

	// 	$.ajax({
	// 		url: 'http://ws.audioscrobbler.com/2.0/?format=json&api_key=f3901a0e169d1ce48b125d5d90081798&method=track.getSimilar&artist=' + app.artist + '&track=' + app.track,
	// 		type: 'GET',
	// 		dataType: 'jsonp',
	// 		success: function(response){
	// 			app.likeResponse(response);
	// 			app.findYT();
	// 		}
	// 	});
	// },
	// dislikeResponse: function(response){
	// 	if(response.error){
	// 	 console.log("ERRORRRR");
	// 	 app.dislike();
	// 	}
	// 	var match;
	// 	var random;
	// 	var playcount;
	// 	app.preartist = app.artist;
	// 	do{
	// 		random = app.randomNum(0,200);
	// 		if(!response.similartracks.track)
	// 			continue;
	// 		if(response.similartracks.track[random].playcount)
	// 			playcount = Number(response.similartracks.track[random].playcount);
	// 		if(response.similartracks.track[random].match)
	// 			match = Number(response.similartracks.track[random].match);
	// 		else
	// 			continue;
	// 		if(response.similartracks.track[random].artist.name)
	// 			app.artist = response.similartracks.track[random].artist.name;
	// 		else
	// 			continue;

	// 	}while(match > 0.3 || playcount < 7000 || app.artist === app.preartist || app.checkPlay());

	// 	if(response.similartracks.track[random].name)
	// 		app.track = response.similartracks.track[random].name;
	// 	else
	// 		app.track = response.similartracks.track[random].track;

	// 	$('.track').html(app.track);
	// 	$('.artist').html('by ' + app.artist);

	// },
	// dislike: function(){

	// 	$.ajax({
	// 		url: 'http://ws.audioscrobbler.com/2.0/?format=json&api_key=f3901a0e169d1ce48b125d5d90081798&method=track.getSimilar&artist=' + app.artist + '&track=' + app.track,
	// 		type: 'GET',
	// 		dataType: 'jsonp',
	// 		success: function(response){
	// 			app.dislikeResponse(response);
	// 			app.findYT();
	// 		}
	// 	});

	// },
	findYT: function(){
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&videoDefinition=high&videoEmbeddable=true&maxResults=3&q=' + app.track.split(' ').join('+') + '+' +  app.artist.split(' ').join('+')  +'&key=AIzaSyAhi8X9TruBemWr3fvKt-wyyUYwAIgIz2c',
			type: 'GET',
			dataType: 'jsonp',
			success: function(response){
				for(var i=0; i< response.items.length; i++){
					console.log(response.items[i].snippet.channelTitle);
					if(response.items[i].snippet.channelTitle.indexOf(/vevo/i) > 0){
						YT = response.items[i].id.videoId;
						break;
					}
					else{
						YT = response.items[0].id.videoId;
					}
				}
				
				player.loadVideoById(response.items[0].id.videoId);
				app.play();
				$('.button').prop('disabled', false);
			}
		});

	},
	play: function(){
		app.played.push({
			artist: app.artist,
			track: app.track
		});
	},
	checkPlay: function(){
		for (var object in app.played){
			var a = app.played[object].artist;
			var t = app.played[object].track;
			if (a===app.artist && t === app.track)
				return true;
		}
	},
	addLike: function(){
		app.liked.push({
			artist: app.artist,
			track: app.track,
			url: YT
		});
		app.fb = new Firebase('https://playlist-zaid.firebaseio.com/' + app.id + '/' + app.playlist + '/' + app.track.replace('$', '').replace('.', '').replace('[', '').replace(']', '').replace('#', ''));
		app.fb.push({
				artist: app.artist,
				track: app.track,
				url: YT
			});

		var postsRef = new Firebase("https://playlist-zaid.firebaseio.com/" + app.id);

		// Attach an asynchronous callback to read the data at our posts reference
		postsRef.on('value', function (snapshot) {
			app.previousPlaylists = snapshot.val();
			//console.log(app.previousPlaylists);

			app.loadPlaylistNames();

		}, function (errorObject) {
		  console.log('The read failed: ' + errorObject.code);
		});
	},
	menu: function(){
		var wrapper = $('.wrapper');
		var nav = $('nav.right');

		$('.playlist').on('click', function(){
			if(nav.css('display') === 'none'){
				wrapper.animate({
					width: '750px'
				}, 500, function(){
					nav.fadeIn();
				});
			} else {
				nav.fadeOut(400, function(){
					wrapper.animate({
						width: '550px'
					}, 500);
				});
			}
		});
		
	},
	loadPlaylistNames: function(){
		for(var i in app.previousPlaylists){
			app.prevPlay.push(i);
		}
		$('p.pre').on('click', function(){
			$('.create').hide();
			$('.rel').fadeIn();
			app.playback(app.prevPlay[0]);

			$('svg').fadeIn();

			for(var i=0; i<app.prevPlay.length; i++){
				$('nav.right ul').append('<li class="playlist">' + app.prevPlay[i] + '</li>');
			}
			$('nav.right ul').append('<li class="createNew">' + 'Create New Playlist' + '</li>');

			$('.playlist').on('click', function(){
				var pName = $(this).text();
				if(pName)
					app.playback(pName);
			});
			app.menu();

			$('.createNew').on('click', function(){
				window.location.reload();
			});

		});

	},
	playback: function(playlistName){
		app.playingPreviousPlaylists = true;
		app.selectedPlaylist = [];
		if(!app.previousPlaylists || !app.previousPlaylists[playlistName])
			alert('Please add songs to the playlist before playing it.');
		var pL = app.previousPlaylists[playlistName];
		for(var i in pL){
			var obj = pL[i];
			for(var j in obj){
				app.selectedPlaylist.push(obj[j]);
			}
		}
		app.playSelected();
		$('.like ').hide();
		$('.dislike').hide();
		$('.button').prop('disabled', true);
	},
	playSelected: function(){


			setTimeout(function(){
				$('.button').prop('disabled', false);
			}, 1000);

		var rand = app.randomNum(0, app.selectedPlaylist.length-1);
		var song = app.selectedPlaylist[rand];
		app.selectedPlaylist.splice(rand, 1);


		$('.next').fadeIn();
		$('.artist').text(song.artist);
		$('.track').text(song.track);
		//$('#player').attr('src', song.url);
		console.log(song.url);
		player.loadVideoById(song.url);

		$('.next').on('click', function(){
			$('.button').prop('disabled', true);
			if(app.selectedPlaylist.length > 0)
				app.playSelected();
			else{
				alert('No more songs in the playlist. Please choose another playlist or create a new one');
			}
		});
	},
	nextSong: function(){
		if(app.playingPreviousPlaylists){
			if(app.selectedPlaylist.length > 0)
				app.playSelected();
			else{
				alert('No more songs in the playlist. Please choose another playlist or create a new one');
			}
		}
		else
			app.respond();
	}
};

var auth;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create YouTube player(s) after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    	videoId: app.src,
   		events: {
      	'onStateChange': onPlayerStateChange
		}
  });
}

function onPlayerStateChange(event){
	if(player.getPlayerState() === 0){
		app.nextSong();
	}

}

$(function(){

	app.danceMin = 0;
	app.danceMax =  100;
	app.energyMin = 0;
	app.energyMax = 100;

	var myRef = new Firebase("https://playlist-zaid.firebaseio.com");
	auth = new FirebaseSimpleLogin(myRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
		// console.log(user.thirdPartyUserData);
	    $('p.name').text(user.displayName);
	    $('img.pic').attr('src',user.thirdPartyUserData.profile_image_url);
	    $('.create').fadeIn();
	    $('nav.top').fadeIn();
	    $('.login').hide();
	    app.id = user.id;


	    	$('#energy').ionRangeSlider({
		        min: 0,
		        max: 100,
		        type: "double",
		        postfix: "%",
		        fromNumber: 0,
		        toNumber: 100,
		        onChange: function(obj) {
		            app.energyMin = obj.fromNumber;
		            app.energyMax = obj.toNumber;
		        }
	    	});

	    	$('#dance').ionRangeSlider({
		        min: 0,
		        max: 100,
		        type: "double",
		        postfix: "%",
		        fromNumber: 0,
		        toNumber: 100,
		        onChange: function(obj) {
		           app.danceMin = obj.fromNumber;
		           app.danceMax = obj.toNumber;
		        }
	    	});

	    	// Get a reference to our posts
	    	var postsRef = new Firebase("https://playlist-zaid.firebaseio.com/" + app.id);

	    	// Attach an asynchronous callback to read the data at our posts reference
	    	postsRef.on('value', function (snapshot) {
	    		app.previousPlaylists = snapshot.val();
	    		//console.log(app.previousPlaylists);


	    		app.loadPlaylistNames();

	    		if(app.previousPlaylists !== null){
	    			$('p.pre').fadeIn();
	    		}

	    	}, function (errorObject) {
	    	  console.log('The read failed: ' + errorObject.code);
	    	});

	   
	  } else {
	    // user is logged out
	  }
	});

	$("form").on('submit', function(e){
		e.preventDefault();
		
		app.playlist = $('.playlistName').val();
		if(app.playlist !== ""){

			var playlistExists = false;
			for(var i=0; i <app.prevPlay.length; i++)
				if(app.playlist === app.prevPlay[i]){
					alert('You already have a playlist with that name. Please enter a different name or click on the link below to listen to a previously created playlist.');
					playlistExists = true;
					break;
				}
			if(!playlistExists){
				$('.create').hide();
				$('.rel').fadeIn();
				app.begin();
			}
		}else{
			alert('Please enter a playlist name');
			}


	});

	$('.twitter').on('click',  function() {
		auth.login("twitter"); // this could be "facebook", "twitter", "password", etc...
	});

	$('.logout').on('click', function(){
		auth.logout();
		window.location.reload();
	});

});