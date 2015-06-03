$(document).ready(function() {
	var App = Backbone.Router.extend({
		routes: {
			'': 'home',
			'home': 'home',
			'search/:query': 'search',
			'search/new/:query': 'shitSearch'
		},

		home: function () {
			$('#search').hide();
			$('#home').show();
		},

		search: function(query) {
			$('#home').hide();
			$('#search').show();
		},

		shitSearch: function(query) {
			$('#home').hide();
			$('#search').show();
		}

	});

	var myRouter = new App();
	Backbone.history.start();


	$('#search-form').on('submit', function(e) {
		e.preventDefault();
		var query = $('#query').val();
		var movieSelection = '';

		myRouter.navigate('search/'+query, {trigger: true});

		var watchList = [];
		var moviesToWatch = [];


		function onReceivedMovies(movies) {
			console.log(onReceivedMovies);
			console.log(movies);
			console.log(movies.Search[0].Title);
		
			for(var i=0;i<movies.Search.length;i++) {
				var $movieSearch = $('<div>'+movies.Search[i].Title+'</div>');
				watchList.push($movieSearch);
				console.log(watchList);
			}

			$('#search').append(watchList);

			for(var i=0; i<watchList.length; i++) {
				watchList[i].on('click', function(e) {
				moviesToWatch.push($(this));
				$('#watch-list').append(moviesToWatch);
				});

				console.log(moviesToWatch);
			}
		};


		













		$.get(
			'http://www.omdbapi.com',
			{
				s: query,
				type: 'movie'
			},
			onReceivedMovies,
			'json'
		);
	});
});