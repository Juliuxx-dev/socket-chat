var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html';
  throw new Error('The name and room are required');
}

var user = {
  name: params.get('name'),
  room: params.get('room')
}

socket.on('connect', function() {
  console.log('Conectado al servidor');

  socket.emit('enterRoom', user, function(res) {
    console.log('Connected Users: ', res);
  });
});

socket.on('disconnect', function() {
  console.log('Perdimos conexión con el servidor');

});

socket.on('createMessage', function(data) {
  console.log('Server:', data);
});


socket.on('currentUsers', function(users) {
  console.log(users);
});

socket.on('privateMessage', function(message) {
  console.log('message: ', message);
});