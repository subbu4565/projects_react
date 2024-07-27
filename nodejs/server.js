const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    console.log(req.url);
    let path='./'
    switch (req.url) {
        case '/':
            path +='index.html';
            break
        case '/about':
            path +='about.html';
            break
        default:
            path +='error.html';
    }

    fs.readFile(path,(err,data)=>{
            if (!err) {
                res.write(data);
                res.end();
            } else {
                console.error(err);
                res.end('error');
            }
    })




}).listen(8080, 'localhost',()=>{
    console.log('Server listening on port 8080');
});