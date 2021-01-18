class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => { // socket: client
            // escuchar el evento 'mensaje-cliente' y hacer console log del payload
            socket.on('mensaje-to-server',(data) => {
                console.log(data);
                this.io.emit('mensaje-from-server', data);  
            });
        });

    }

}

module.exports = Sockets;

// io.on('connection', (socket) => { // socket: client
//     // enviar mensajes desde el servidor 
//     // socket.emit('mensaje-bienvenida', {
//     //     msg: 'Bienvenido al server',
//     //     date: new Date()
//     // });

//     // escuchar el evento 'mensaje-cliente' y hacer console log del payload
//     socket.on('mensaje-to-server',(data) => {
//         console.log(data);

//         // socket.emit('mensaje-from-server', data); se envia solo al mismo cliente
//         // io es el namespace (se envia a todos en el namespace)
//         io.emit('mensaje-from-server', data);  
//     });
// });