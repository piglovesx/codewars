var connect = require('connect');
var auth = require('basic-auth');

var app = connect()
.use(function(req, res, next) {
	var user = auth(req);
	if(!user || user.name !== 'zl' || user.pass !== 'zl') {
		res.writeHead(401, {
			'WWW-Authenticate': 'Basic realm="example"'
		});
		res.end();
	} else {
		next();
	}
})
.use(function (req, res) {
res.end("I'm a secret\n");
});

app.listen(3000);