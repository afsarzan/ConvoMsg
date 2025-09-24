import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const ROOM = 'convoMsgRoom';

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', async (username) => {
    console.log(`${username} joined the room`);
    await socket.join(ROOM);
    socket.to(ROOM).emit('roomNotice', username);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chatMessage', (msg) => {
    console.log('message: ' + {msg});
    socket.to(ROOM).emit('chatMessage', msg);
  });
});

server.listen(4600, () => {
  console.log('server running at http://localhost:4600');
});