var http = require('http'); // npm i --save-dev @types/node, node has built-in lib called http, this is listening for the req 
var nycEnergyData = require('../data/data.json'); // imports data.json
var test = require('../src/index.js'); // this loads the js file to here 
// const fs = require('fs')
// const js = "src/index.js"
// const jsFile = fs.readFileSync(js)
var server = http.createServer(function (req, res) {
    if (req.url === '/api/test' && req.method === 'GET') { // sets the res being sent to a specific url and if the HTTP verb is 'GET'
        // res.setHeader('Content-type', 'application/json') // json is the formate that is being sent back 
        res.setHeader('Access-Control-Allow-Origin', '*'); // this is to help avoid CORS issues 
        res.writeHead(200, { 'Content-type': 'text/html' }); // HTTP status code 200, ok && html is the formate that is being sent back 
        res.write("<html><script src=\"" + test + "\"></script><body>hello world</body></html>");
        res.end();
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', '*'); // this is to help avoid CORS issues 
        res.writeHead(404, { 'Content-type': 'application/json' }); // json is the formate that is being sent back 
        res.end(JSON.stringify({ errMsg: 'Invalid Url Route' }));
    }
}); // end of server 
var PORT = process.env.PORT || 8000; // the process.env prop is an obj which store and controls info about the env in which the process is currentlt running 
server.listen(PORT, function () {
    console.log('listening on port 8000'); // this cb is an opt param 
});
