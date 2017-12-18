/**
 * Created by jb on 12/9/17.
 * Simple web server.
 */

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to the future rivel level website location. Lose the uncertainty, not the gear.\n');
}).listen(2000, "0.0.0.0");
console.log('Server running at http://riverlevel:2000/');
