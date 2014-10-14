var fs = require('fs');
var sss = [];
var sd = "";

fs.readFile("./aspwebservice.txt", function(err, text) {
	if (err) throw err;
	var s = text.toString();
	var ss = s.split("\n");
	for (var i = 0; i < ss.length; i++) {
		sss[i] = ss[i].replace(/^\"|\\|\"$/g, "");
		sd = sd + sss[i] + "\n";
		console.log(sss[i]);
	}
	console.log(ss.length);
	fs.writeFile("./aspwebservice.txt", sd, function(err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
});