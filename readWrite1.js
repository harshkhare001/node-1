const http = require('http');
const fs =  require('fs');
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url==='/')
    {   
        const data = fs.readFileSync('message.txt').toString();
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write(data);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/message' && method==='POST')
    {
         const body = [];
         req.on('data',(chunk)=>{
             console.log(chunk);
             body.push(chunk);
         });
         req.on('end',()=>{
             const paresdBody = Buffer.concat(body).toString(); 
             console.log(paresdBody);
             const message = paresdBody.split('=')[1];
             fs.writeFileSync('message.txt',message);
        })
        
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();

    }
})

server.listen(3000);