var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
	if ('/' == req.url) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream('./index.html').pipe(res); 
	}
	if ('/image.jpg' == req.url) {
		res.setHeader('Content-Type', 'application/octet-stream');
		res.setHeader('Content-Disposition', 'attachment; filename='+req.url);
		res.statusCode = 200;
		fs.createReadStream('./image.jpg').pipe(res); 
	}
}).listen(3000);
console.log('Server running at http://localhost:3000/');
