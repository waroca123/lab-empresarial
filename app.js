const http = require('http');
const fs = require('fs');
const { execFile } = require('child_process');

const DEPLOY_SECRET = fs
    .readFileSync('/home/chfyhzlp/.deploy-secret', 'utf8')
    .trim();

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (req.method === 'POST' && req.url === '/deploy') {
        const secret = req.headers['x-deploy-secret'];

        if (secret !== DEPLOY_SECRET) {
            res.writeHead(401);
            return res.end(JSON.stringify({
                status: 'error',
                message: 'No autorizado'
            }));
        }

        execFile(
            '/bin/bash',
            ['/home/chfyhzlp/deploy-lab.sh'],
            { timeout: 120000 },
            (error) => {
                if (error) {
                    res.writeHead(500);
                    return res.end(JSON.stringify({
                        status: 'error',
                        message: 'Error durante el despliegue'
                    }));
                }

                res.writeHead(200);
                return res.end(JSON.stringify({
                    status: 'success',
                    message: 'Despliegue completado'
                }));
            }
        );

        return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
        application: 'Desarrollo de Software Empresarial',
        status: 'running',
        message: 'DESPLIEGUE 100% AUTOMATICO',
        node: process.version,
        environment: process.env.NODE_ENV || 'not-defined'
    }));
});

server.listen();
