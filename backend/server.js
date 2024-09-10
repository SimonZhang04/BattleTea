// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// Serve static files if needed (if you want to serve assets from the backend)
app.get('/', (req, res) => {
  res.send('Game Server is Running');
});

// Setup socket.io for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages or events
  socket.on('message', (data) => {
    console.log('Message from client:', data);
    socket.broadcast.emit('message', data); // Broadcast to other clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
