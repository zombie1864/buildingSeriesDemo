const http = require('http')
// const tsFile = require('./index') // this loads the js file to here 
import Main from './index'

const server = http.createServer( (req: any, res: any) => { 

    if (req.url === '/api/' && req.method === 'GET') { // sets the res being sent to a specific url and if the HTTP verb is 'GET'
        // res.setHeader('Content-type', 'application/json') // json is the formate that is being sent back 
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        res.writeHead(200, {'Content-type': 'text/html'}) // HTTP status code 200, ok && html is the formate that is being sent back 
        const invOne = new Main('j', 'working', 200)
        console.log(invOne);
        
        // res.write(invOne)
        res.write(`<html><body>hello world</body></html>`)
        res.end()
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        res.writeHead(404, {'Content-type': 'application/json'}) // json is the formate that is being sent back 

        res.end(JSON.stringify({errMsg: 'Invalid Url Route'}))
    }
}); // end of server 

const PORT = process.env.PORT || 8000 // the process.env prop is an obj which store and controls info about the env in which the process is currentlt running 

server.listen(PORT, () => {
    console.log('listening on port 8000'); // this cb is an opt param 
})