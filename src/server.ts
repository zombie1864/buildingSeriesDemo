const http = require('http')
import * as fs from 'fs'
import * as path from 'path'
import Main from './index'

const server = http.createServer( (req: any, res: any) => { 
    
    if (req.url === '/api/' && req.method === 'GET') { // sets the res being sent to a specific url and if the HTTP verb is 'GET'
    
        res.setHeader('Access-Control-Allow-Origin', '*') // this is to help avoid CORS issues 
        res.writeHead(200, {'Content-Type': 'text/html'}) // HTTP status code 200, ok && html is the formate that is being sent back 
        const main = new Main() // inst of class obj 
        fs.readFile(path.join(__dirname, '/index.html'), 'utf8', (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            res.write(
                `${main.initMap()}`+`${main.cssStyle()}` + `${main.mapComp()}` + `<div>${main.tableComp()}</div>`
                )
            res.end()
        })
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