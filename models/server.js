// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');
const cors     = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);

        // configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */});
    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        // CORS
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {
        // inicializar middlewares
        this.middlewares();

        // configurar sockets
        this.configurarSockets();

        // inicializar el server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en ${this.port}`);
        });
    }
}

module.exports = Server;