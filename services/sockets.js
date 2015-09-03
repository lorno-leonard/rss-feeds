var rss = require('./rss'),
	feed = require("feed-read"),
	async = require('async');

module.exports = function(app) {
	var io = require('socket.io')(app);

	io.on('connection', function (socket) {
		// ON 'init' event
		socket.on('init', function(data) {
			console.log('ON init', data);

			async.auto({
				loadRssItems: function(callback) {
					feed("http://craphound.com/?feed=rss2", function(err, articles) {
						if(err) {
							callback(err, null);
						}
						else {
							callback(null, articles);
						}
					});
				}
			}, function(err, results) {
				socket.emit('feed', results.loadRssItems);
			});
		});
	});

	return io;
};
