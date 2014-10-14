var bodyParser = require('body-parser');
var connect = require("connect"), formidable = require('formidable');
var app = connect()
.use(bodyParser.json())
.use(function(req, res, next) {
	if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			console.log(fields);
			console.log(files);
		});
	}

	next();
})
.use(function(req, res) {
	console.log(req.body);
	res.end('viewing user ' + req.body.username);
}).listen(3000);