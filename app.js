const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

    res.end(JSON.stringify({
        application: 'Desarrollo de Software Empresarial',
        status: 'running',
        message: 'PRUEBA DESPLIEGUE AUTOMATICO',
        node: process.version,
        environment: process.env.NODE_ENV || 'not-defined'
    }));
});

server.listen();
