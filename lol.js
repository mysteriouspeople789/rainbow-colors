var http = require('http');
var url = require('url');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');
var requestsServed = 0;

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    requestsServed += 1;
    if((requestsServed % 10) == 0) {
        console.log('Requests Served:', requestsServed);
    }

    if(page == '/') {
        const indexHTML = fs.readFileSync(path.join(__dirname, 'index.html'));
        res.write(indexHTML);
        res.end();
    }
    else {
        try {
            const requested = fs.readFileSync(path.join(__dirname, page));
            res.writeHead(200);
            res.write(requested);
            res.end();
        } catch(e) {
            console.log(e);
        }
    }
});

server.on('error', function (e) {
    console.log('There has been an error. ');
    setTimeout(process.exit, 2000);
});

server.listen(1857);
//doUpdate();
console.log('Listening on port 1857');