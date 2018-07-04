var viz = require('../lib');

viz.api.getAccountCount(function(err, result) {
	console.log(err, result);
});

viz.api.getAccounts(['dan'], function(err, result) {
	console.log(err, result);
});

viz.api.getState('trending/viz', function(err, result) {
	console.log(err, result);
});

viz.api.getFollowing('ned', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

viz.api.getFollowers('dan', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

viz.api.streamOperations(function(err, result) {
	console.log(err, result);
});

viz.api.getDiscussionsByActive({
  limit: 10,
  start_author: 'thecastle',
  start_permlink: 'this-week-in-level-design-1-22-2017'
}, function(err, result) {
	console.log(err, result);
});
