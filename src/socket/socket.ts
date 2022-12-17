import { Server } from 'socket.io';
import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let users: { userId: string; socketId: string }[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!users?.some((user) => user?.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('add_user', ({ userId }) => {
    addUser(userId, socket.id);
  });

  socket.on('send_message', ({ senderId, receiverId, message, time }) => {
    const user = getUser(receiverId);

    if (user) {
      io.in(user.socketId).emit('receive_message', {
        senderId,
        message,
        time,
      });
    }
  });

  socket.on('remove_user', ({ userId }) => {
    users = users.filter((user) => user.userId !== userId);
  });
});

export { server, app };
