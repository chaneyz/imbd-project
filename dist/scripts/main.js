$(document).ready(function() {
	var App = Backbone.Router.extend({
		routes: {
			'': 'home',
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
			console.log('search', query);
		}

	});

	var myRouter = new App();
	Backbone.history.start();


	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#query').val();

		myRouter.navigate('search/'+query, {trigger: true});

		console.log(query);


	});


	function onReceivedMovies(movies) {
		console.log(onReceivedMovies);
		console.log(movies);
		console.log(movies.Search[0].Title);
	}

	$.get(
		'http://www.omdbapi.com',
		{
			s: 'lord of the rings',
			type: 'movie'
		},
		onReceivedMovies,
		'json'
	);
});