let http = require('http')
let server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'})
	res.write('hello')
	res.end()
}).listen(3333,'127.0.0.1')
console.log('begin server')