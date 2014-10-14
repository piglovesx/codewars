var connect = require('connect');

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end("hell world");
}

function restrict(req, res, next) {
	var authorization = req.headers.authorization;
	if(!authorization) return next(new Error('Unauthorization'));
	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user =  auth[0];
	var pass = auth[1];
	console.log('%s %s', user, pass);
	next();
}

function admin(req, res, next) {
	console.log("admin");
	switch (req.url) {
		case '/': 
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

connect().use(logger).use('/admin', restrict).use('/admin', admin).use(hello).listen(3000);