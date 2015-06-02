var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Slack = require('node-slack');
var slack = new Slack('https://hooks.slack.com/services/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');



app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 10000, function() {
	console.log('RSGBot online');
});

app.use(
	'/',
	express.static(__dirname)
);

app.post('/build', function(req, res) {
	var reply = slack.respond(req.body, function(hook) {
		console.log('Received build command from Slack');
		console.log(hook.text);
		var splitStrings = hook.text.split(': ');
		var buildname = splitStrings[1];

		return {
			text: 'Build request for project ' + buildname,
			username: 'RSGBot'
		};
	});

	return res.status(200).json(reply);
});