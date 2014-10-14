//https://github.com/peterwooley/connect-vhost-example
var connect = require('connect');
var vhost = require('vhost');
var server = connect();
var app = connect().use(function(req, res, next) {
	console.log(req.vhost);
	res.end('This is Vhost');
});
server.use(vhost('foo', app));
server.listen(80);