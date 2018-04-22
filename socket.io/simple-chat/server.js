const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, './public')));

io.on('connection', (socket) => {
  console.log('New connection from client');

  socket.emit('serverMessage', {
    text: 'Hi there, this is the server',
    when: new Date()
  });

  socket.on('clientMessage', (message) => {
    console.log('Message from client', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Express App with socket.io support in ${port}`);
});
