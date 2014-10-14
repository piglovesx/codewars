var net = require("net");

var server = net.createServer(function(socket) {
	// console.log(socket);
	socket.on('data', function(data) {
		console.log(data.toString());
		if (/\\n/.test(data.toString())) {
			console.log("hello");
		}
		socket.write(data);
	});
});

server.listen(8888);
