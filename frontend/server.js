const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('code.update', (data) => {
        socket.broadcast.emit('code.update', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
