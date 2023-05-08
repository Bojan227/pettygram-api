import { Server } from "socket.io";
import User from "../models/userModel";
import Notifications from "../models/notificationsModel";
import express from "express";

//redis client
import { redisClient } from "../redis";

const app = express();
import http from "http";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://pettygram.vercel.app",
    methods: ["GET", "POST"],
  },
});

const addUser = async (userId: string, socketId: string) => {
  const user = await getUser(userId);
  const userParsed = JSON.parse(user);

  if (userParsed?.userId !== userId) {
    await redisClient.hSet(
      "users",
      userId,
      JSON.stringify({ userId, socketId })
    );
  }
};

const getUser = async (userId: string) => {
  const user = await redisClient.hGet("users", String(userId));

  return user;
};

io.on("connection", (socket) => {
  socket.on("add_user", ({ userId }) => {
    addUser(userId, socket.id);
  });

  socket.on("getOnlineUsers", async () => {
    const users = await redisClient.hGetAll("users");
    const usersArray = [];

    for (let user in users) {
      usersArray.push(JSON.parse(users[user]));
    }

    io.emit("online-users", usersArray);
  });

  socket.on(
    "send_notification",
    async ({ senderId, receiverId, action, message }) => {
      const user = await getUser(receiverId);

      const sender = await User.findOne({ _id: senderId }, { password: 0 });
      await Notifications.create({
        receiver: receiverId,
        sender: senderId,
        message,
        action,
        read: false,
        createdAt: new Date(),
      });

      if (user) {
        const userObj = JSON.parse(user);

        io.in(userObj.socketId).emit("receive_notification", {
          sender,
          receiver: receiverId,
          action,
          message,
          read: false,
          createdAt: new Date(),
        });
      }
    }
  );

  socket.on("send_message", async ({ senderId, receiverId, message, time }) => {
    const user = await getUser(receiverId);

    if (user) {
      const userObj = JSON.parse(user);
      io.in(userObj.socketId).emit("notification_message", {
        senderId,
        message,
        receiverId,
        time,
        unread: true,
      });
    }
  });

  socket.on("send_message", async ({ senderId, receiverId, message, time }) => {
    const user = await getUser(receiverId);

    if (user) {
      const userObj = JSON.parse(user);

      io.in(userObj.socketId).emit("receive_message", {
        senderId,
        message,
        receiverId,
        time,
        unread: true,
      });
    }
  });

  socket.on("remove_user", async ({ userId }) => {
    await redisClient.hDel("users", String(userId));
  });
});

export { server, app };
