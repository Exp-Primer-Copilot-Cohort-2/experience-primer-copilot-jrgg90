//Create web server
const express = require('express');
const app = express();
// Create a server
const http = require('http');
const server = http.createServer(app);
// Create socket.io
const io = require('socket.io')(server);

// Create a list of comments
const comments = [
    { name: "Alice", comment: "Hello!" },
    { name: "Bob", comment: "Hi!" },
    { name: "Carol", comment: "Good morning!" }
];

// Send comments to clients
function sendComments(socket) {
    // Send comments to clients
    socket.emit('comments', comments);
}

// Event listener when a client connects
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send comments to clients
    sendComments(socket);

    // Event listener when a client posts a comment
    socket.on('post', (data) => {
        console.log('post:', data);
        // Add a comment to the list
        comments.push(data);
        // Send comments to clients
        io.emit('comments', comments);
    });

    // Event listener when a client disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Start server');
});