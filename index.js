#!/usr/bin/env node
var request = require('request');
var nconf = require("nconf");

nconf.env().argv();

var url = nconf.get("url");
var username = nconf.get("username");
var password = nconf.get("password");

request(url, function(err, response, body) {
	if (err) throw err;

	var date = new Date();
	var message = "";

	switch(response.statusCode) {
		case 503:
			message = " :: error :: 503 (Bad Gateway)";
		break;
		case 500:
			message = " :: error :: 500 (Unexpected Error)";
		break;
		case 404:
			message = " :: error :: 404 (URL Not Found)";
		break;
		case 401:
			message = " :: error :: 401 (Not Authorized)";
		break;
		case 200:
			message = " :: success :: " + response.body;
		break;
		default:
			message = " :: error :: 000 (Unknown Error)";
		break;
	}

	console.log(date + message);

}).auth(username, password, true);