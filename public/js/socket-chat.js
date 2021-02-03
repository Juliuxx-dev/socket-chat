var socket = io();
var params = new URLSearchParams(window.location.search);

var rooms = ['Casual', 'Cine', 'Videojuegos'];
var room = params.get('room');

if (!params.has('name') || !params.has('room') || !rooms.includes(room)) {
  window.location = 'index.html';
  throw new Error('The name and room are required');
}

var user = {
  name: params.get('name'),
  room: params.get('room')
}

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('enterRoom', user, function(res) {
    console.log('Connected Users: ', res);
    renderUsers(res);
  });
});

socket.on('disconnect', function() {
  console.log('We lost connection with the server');
});

socket.on('createMessage', function(data) {
  renderMessage(data, false);
  scrollBottom();
});


socket.on('currentUsers', function(users) {
  renderUsers(users);
});

socket.on('privateMessage', function(message) {
  console.log('message: ', message);
});