import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
// const cloudinary = require('cloudinary').v2;

// config env

import dotenv from 'dotenv';

dotenv.config();

// routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import savedRoute from './routes/savedRoute';
import taggedRoute from './routes/taggedRoute';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/saved', savedRoute);
app.use('/tagged', taggedRoute);
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  console.log('Connected to DB');
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
