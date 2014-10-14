var http = require('http'); 
var fs = require('fs'); 
var path = require('path'); 
var mime = require('mime'); 
var cache = {};
var chatServer = require('./chat_server');

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write("Error 404: response not found");
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) { 
		sendFile(response, absPath, cache[absPath]); 
	} else {
		fs.exists(absPath, function(exists) { 
			if (exists) {
				fs.readFile(absPath, function(err, data) { 
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data); 
					}
				});
			} else {
				console.log(absPath);
				send404(response); 
			}
		});
	}
}

var server = http.createServer(function(request, response) { 
	var filePath = false;
	if (request.url == '/') {
		filePath = 'public/index.html'; 
	} else if (request.url == '/topTitle') {
		// filePath = "/topTitle"
		fs.readFile('./entries.json', function(err, data) { 
			if (err) throw err;
			entries = JSON.parse(data.toString()); 
			var output = '<html><head></head><body>' + 
			'<h1>Latest Posts</h1>' +
			'<ul>';
			for (var index in entries) {
				output += '<li>' + entries[index].title + '</li>';
			}
			output += '</ul></body></html>';
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(output);
		});
		return;
	} else{
		filePath = 'public' + request.url; 
	}
	var absPath = '../' + filePath;
	serveStatic(response, cache, absPath); 
});

server.listen(3000, function(){
	console.log("started listening on 3000");
});

chatServer.listen(server);
