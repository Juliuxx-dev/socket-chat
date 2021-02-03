const { io } = require('../server');
const { Users } = require('../classes/users.js');
const users = new Users();
const { createMessage } = require('../utils/utils.js')

io.on('connection', (client) => {

  client.on('enterRoom', (user, callback) => {

    if (!user.name || !user.room) {
      return callback({
        error: true,
        message: 'The name and room are required'
      });    
    }

    client.join(user.room);

    users.addPerson(client.id, user.name, user.room);

    client.broadcast.to(user.room).emit('createMessage', createMessage('ADMIN', `${user.name} has entered the room.`));
    client.broadcast.to(user.room).emit('currentUsers', users.getPersonsByRoom(user.room));

    callback(users.getPersonsByRoom(user.room));
  });

  client.on('createMessage', (user, callback) => {
    let person = users.getPerson(client.id);
    let message = createMessage(person.name, user.message);

    client.broadcast.to(person.room).emit('createMessage', message);
    callback(message);
  });

  client.on('disconnect', () => {
    let removedUser = users.removePersonFromRoom(client.id);

    client.broadcast.to(removedUser.room).emit('createMessage', createMessage('ADMIN', `${removedUser.name} has left the room.`));
    client.broadcast.to(removedUser.room).emit('currentUsers', users.getPersonsByRoom(removedUser.room));
  });

  client.on('privateMessage', data => {
    let person = users.getPerson(client.id);

    client.broadcast.to(data.to).emit('privateMessage', createMessage(person.name, data.message))
  });

  client.on('searchUser', (data, callback) => {
    callback(users.getPersonsByRoom(data.room, data.filter));
  });
});