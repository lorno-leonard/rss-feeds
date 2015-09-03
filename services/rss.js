var feed = require("feed-read"),
	async = require('async');

module.exports = {
	test: function(socket) {
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
	}
};
