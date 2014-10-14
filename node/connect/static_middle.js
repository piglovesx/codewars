var connect = require('connect')
var serveStatic = require('serve-static')
var serveIndex = require('serve-index');

var app = connect();

app.use(serveIndex('./', {'icons': true}))
app.use(serveStatic('./', {'index': ['default.html', 'default.htm']}));
// app.use(serveStatic1('./connect', {'index': ['default.html', 'default.htm']}))
app.listen(3000);