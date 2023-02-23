import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { server, app } from './socket/socket';
import seedDB from './utils/seedDb';

// config env
import dotenv from 'dotenv';

dotenv.config();

// routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import savedRoute from './routes/savedRoute';
import chatRoutes from './routes/chatRoutes';
import notificationRoutes from './routes/notificationRoutes';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/saved', savedRoute);
app.use('/chat', chatRoutes);
app.use('/notifications', notificationRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(process.env.PORT || 4000);
  seedDB();
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
