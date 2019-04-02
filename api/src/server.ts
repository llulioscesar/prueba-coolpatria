import app from './app'
import * as http from 'http'

const normalizePort = val => {
    var port = parseInt(val, 10);
    if(isNaN(port)){
        return val
    }
    if (port >= 0){
        return port;
    }
    return false;
};

const onError = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    let bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
};

const PORT = normalizePort(process.env.PORT || 3000);

app.set('port', PORT);

const server = http.createServer(app);
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);