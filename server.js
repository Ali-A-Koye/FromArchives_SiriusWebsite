const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//
//
process.on('uncaughtException', err => {
  //listening to uncaughtException Event(like DOM)
  console.log((err.name, err.message));
  console.log('uncaughtException: SHUTTING DOWN...');
  process.exit(1); //1 for shutting down
});

dotenv.config({ path: './config.env' }); //connecting to our custom Variables

//connect to Mango Database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('CONNECTED to the DATABASE');
  });
//........CALLING UPON THE SERVER...........
const port = process.env.PORT || 3000;
const server = http.listen(port, () => {
  console.log(`App Running on port ${port}`);
});

//for error Promises in Server.js
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION: SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});

const users = {};
let photos = {};
let ides = {};
let count = 0;
io.on('connection', socket => {
  ///
  ///
  socket.on('new-user', (name, userphoto, id) => {
    users[socket.id] = name;
    photos[socket.id] = userphoto;
    ides[socket.id] = id;
    socket.broadcast.emit('user-connected', name, userphoto, id);

    const usernumer = Object.values(users);
    count = 0;
    usernumer.forEach(() => count++);
    socket.emit('counter', { count: count });
    socket.broadcast.emit('counter', { count: count });
  });
  //
  //
  //
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id],
      photo: photos[socket.id],
      id: ides[socket.id]
    });
  });
  socket.on('disconnect', async () => {
    socket.broadcast.emit(
      'user-disconnected',
      users[socket.id],
      photos[socket.id],
      ides[socket.id]
    );
    await delete users[socket.id];
    count = count - 1;
    socket.emit('counter', { count: count });
    socket.broadcast.emit('counter', { count: count });
  });
});
