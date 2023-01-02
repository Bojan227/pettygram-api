import { Server } from 'socket.io';
import User from '../models/userModel';
import Notifications from '../models/notificationsModel';
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
    console.log(users);
  });

  socket.on('getOnlineUsers', () => {
    io.emit('online-users', users);
  });

  socket.on(
    'send_notification',
    async ({ senderId, receiverId, action, message }) => {
      const user = getUser(receiverId);
      const sender = await User.findOne({ _id: senderId }, { password: 0 });
      await Notifications.create({
        receiver: receiverId,
        sender: senderId,
        message,
        action,
        read: false,
      });

      if (user) {
        io.in(user.socketId).emit('receive_notification', {
          senderId: sender,
          receiverId,
          action,
          message,
          read: false,
        });
      }
    }
  );

  socket.on('send_message', ({ senderId, receiverId, message, time }) => {
    const user = getUser(receiverId);
    if (user) {
      io.in(user.socketId).emit('notification_message', {
        senderId,
        message,
        receiverId,
        time,
        unread: true,
      });
    }
  });

  socket.on('send_message', ({ senderId, receiverId, message, time }) => {
    const user = getUser(receiverId);
    if (user) {
      io.in(user.socketId).emit('receive_message', {
        senderId,
        message,
        receiverId,
        time,
        unread: true,
      });
    }
  });

  socket.on('remove_user', ({ userId }) => {
    users = users.filter((user) => user.userId !== userId);
    console.log(users);
  });
});

export { server, app };
