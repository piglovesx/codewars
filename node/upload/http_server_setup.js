var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var socketio = require('socket.io');
var form = new formidable.IncomingForm();
var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'GET':
			show(req, res);
			break;
		case 'POST':
			upload(req, res);
			break;
	}
});

function show(req, res) {
	res.setHeader('Content-Type', 'text/html');
	fs.stat('index.html', function(err, stat) {
		res.setHeader('Content-Length', stat.size);
		var stream = fs.createReadStream('./index.html');
		stream.pipe(res);
	});
}

function upload(req, res) {
	if (!isFormData(req)) {
		res.statusCode = 400;
		res.end('Bad Request: expecting multimpart/form-data');
		return;
	}

	// var form = new formidable.IncomingForm();

	form.on('field', function(field, value){
		// console.log(field);
		// console.log(value);
	});

	form.on('file', function(name, file){
		// console.log(name);
		// console.log(file);
	});

	form.on('end', function(){
		res.end('upload complete!');
	});

	form.on('fileBegin', function(name, file) {
		file.path = "./" + file.name;
	});

	

	form.parse(req, function(err, fields, files){
		// console.log(fields);
		// console.log(files);
		res.end('upload complete!');
	});

}

function isFormData(req) {
	// console.log(req);
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}

server.listen(3000, function() {
	console.log("server started");
});

io = socketio.listen(server); 

io.on('connection', function(socket) {
	form.on('progress', function(bytesReceived, bytesExpected){
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		console.log(percent);
		io.emit('progress', percent);
		// console.log(percent);
	});
	console.log("connected");
});