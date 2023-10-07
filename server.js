const http = require('http');
//console.log(http);


const server = http.createServer((req,res)=>{
    if(req.url==='/')
    {
        res.write('Harsh Khare');
        res.end();
    }
});
server.on('connection', (socket)=>{
    console.log("Harsh Khare");
})
server.listen(4000);
console.log("Harsh Khare...");