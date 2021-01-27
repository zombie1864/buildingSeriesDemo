const http = require('http') // npm i --save-dev @types/node, node has built-in lib called http, this is listening for the req 
const nycEnergyData = require('../data/data.json') // imports data.json
const test = require('../src/index.js')
const fs = require('fs')
const js = "src/index.js"
// const jsFile = fs.readFileSync(js)

const server = http.createServer( (req, res) => { // this creates the server, req obj is when an HTTP req is made from the frontend, res is also an obj 
    let jsFile = __dirname + "/index.js"
    fs.access(jsFile, fs.constants.F_OK, err => {
        //check that we can access  the file
        console.log(`${jsFile} ${err ? "does not exist" : "exists"}`);
      });
    if (req.url === '/api/' && req.method === 'GET') { // sets the res being sent to a specific url and if the HTTP verb is 'GET'
        // res.setHeader('Content-type', 'application/json') // json is the formate that is being sent back 
        res.setHeader('Content-type', 'text/html') // json is the formate that is being sent back 
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        // res.writeHead(200) // HTTP status code 200, ok 
        // res.write(`<html><script type="text/javascript" src='test'>`)
        // res.write(jsFile)
        fs.readFile(jsFile, function(err, content) {
            if (err) {
              res.writeHead(404, { "Content-type": "text/html" });
              res.end("<h1>No such image</h1>");
            } else {
              //specify the content type in the response will be an image
              res.writeHead(200, { "Content-type": "text/javascript" });
              res.end(content);
            }
          });
        // res.end()
        // res.end(JSON.stringify(nycEnergyData))
    } else {
        res.setHeader('Content-type', 'application/json') // json is the formate that is being sent back 
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        res.writeHead(404)

        res.end(JSON.stringify({errMsg: 'Invalid Url Route'}))
    }
}); // end of server 

const PORT = process.env.PORT || 8000 // the process.env prop is an obj which store and controls info about the env in which the process is currentlt running 

server.listen(PORT, () => {
    console.log('listening on port 8000'); // this cb is an opt param 
})