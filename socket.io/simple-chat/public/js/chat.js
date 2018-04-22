let socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('clientMessage', {
    text: 'This comes from client',
    when: new Date()
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('serverMessage', function (message) {
  console.log('Message from server', message);
});
