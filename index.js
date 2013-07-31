#!/usr/bin/env node
var request = require('request');
var fs = require('fs');
var nconf = require("nconf");

nconf.env().argv();

var url = nconf.get("url");
var username = nconf.get("username");
var password = nconf.get("password");
var log = nconf.get("log");

request(url, function(err, response, body) {
	if (err) throw err;

	var date = new Date();
	var message = "";

	switch(response.statusCode) {
		case 503:
			message = date + " :: error :: 503 (Bad Gateway)";
		break;
		case 500:
			message = date + " :: error :: 500 (Unexpected Error)";
		break;
		case 404:
			message = date + " :: error :: 404 (URL Not Found)";
		break;
		case 401:
			message = date + " :: error :: 401 (Not Authorized)";
		break;
		case 200:
			message = date + " :: success :: " + response.body;
		break;
		default:
			message = date + " :: error :: 000 (Unknown Error)";
		break;
	}

	fs.appendFile(log, message, function(err) {
		if (err) throw err;
	});	

}).auth(username, password, true);