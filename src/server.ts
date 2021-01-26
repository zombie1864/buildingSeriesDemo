const http = require('http') // npm i --save-dev @types/node, node has built-in lib called http, this is listening for the req 
const nycEnergyData = require('../data/data.json') // imports data.json

const server = http.createServer( (req, res) => { // this creates the server, req obj is when an HTTP req is made from the frontend, res is also an obj 
    if (req.url === '/api/' && req.method === 'GET') { // sets the res being sent to a specific url and if the HTTP verb is 'GET'
        res.setHeader('Content-type', 'application/json') // json is the formate that is being sent back 
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        res.writeHead(200) // HTTP status code 200, ok 
    
        res.end(JSON.stringify(nycEnergyData))
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