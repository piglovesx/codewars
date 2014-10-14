var http = require('http'),
	url = require('url'),
	items = [],
	qs = require('querystring');

var server = http.createServer(function(req, res) {
	if ('/' == req.url) {
		switch (req.method) {
			case 'POST':
				add(req, res);
				/*var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk) {
				item += chunk;
			});
			req.on('end', function() {
				items.push(item);
				res.end('OK\n');
			});*/
				break;

			case 'GET':
				show(res);
				/*var body = items.map(function(item, i) {
				return i + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			items.forEach(function(item, i) {
				res.write(body);
			});
			res.end();*/
				break;
			default:
				badRequest(res);

				/*case 'DELETE':
			console.log(url.parse(req.url));
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;*/
		}
	} else if(req.url.match(/^\/\d+/)) {
		del(parseInt(req.url.slice(1)), res);
	} else {
		notFound(res);
	}
});

server.listen(3000);

function show(res) {
	var html = '<h1>Todo List</h1>' + '<ul>' + items.map(function(item) {
		return '<li>' + item + '<a href="/'+items.indexOf(item)+'">delete</a></li>'
	}).join('') + '</ul>' + '<form method="post" action="/">' + '<p><input type="text" name="item" /></p>' + '<p><input type="submit" value="Add Item" /></p>' + '</form>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
}

function notFound(res) {
	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Not Found');
}

function badRequest(res) {
	res.statusCode = 400;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Bad Request');
}

function add(req, res) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk){ body += chunk });
	req.on('end', function(){
		var obj = qs.parse(body);
		items.push(obj.item);
		show(res);
	});
}

function del(num, res) {
	items.splice(num, 1);
	show(res);
}