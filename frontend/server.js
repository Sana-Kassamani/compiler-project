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

const userFiles = {}; // To keep track of each user's selected file
const fileContents = {}; // To keep track of the current content of each file

io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Track the selected file for each user
    socket.on('file.select', (fileId) => {
        userFiles[socket.id] = fileId;
        // Send the current content of the selected file to the user
        socket.emit('file.content', { fileId: fileId, content: fileContents[fileId] });
    });
    
    socket.on('code.update', (data) => {
        const userFile = userFiles[socket.id];
        if (userFile === data.fileId) {
            fileContents[data.fileId] = data.code;
            io.emit('code.update', data);
        }
    });

    socket.on('disconnect', () => {
        delete userFiles[socket.id];
        console.log('Client disconnected');
    });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
