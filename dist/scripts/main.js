$(document).ready(function() {
	var App = Backbone.Router.extend({
		routes: {
			'': 'home',
			'home': 'home',
			'search/:query': 'search'
		},

		home: function () {
			console.log('home');
			$('.page').hide();
			$('#home').show();
		},

		search: function(query) {
			$('.page').hide();
			$('#search').show();
			console.log(query);
		}
	});

	var myRouter = new App();
	Backbone.history.start();


	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#query').val();

		function onReceivedMovies(movies) {
			console.log(onReceivedMovies);
			console.log(movies);
			console.log(movies.Search[0].Title);
		
			for(var i=0;i<movies.Search.length;i++) {
				var movieSearch = movies.Search[i].Title;
				
				$('#search').html('<div>'+movieSearch+'</div>');


				console.log(movieSearch);
			}
		}

		$.get(
			'http://www.omdbapi.com',
			{
				s: query,
				type: 'movie'
			},
			onReceivedMovies,
			'json'
		);

		myRouter.navigate('search/'+query, {trigger: true});
	});
});