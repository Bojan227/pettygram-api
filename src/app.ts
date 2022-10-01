import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
// const cloudinary = require('cloudinary').v2;

// config env

import dotenv from 'dotenv';

dotenv.config();

// cloudinary.config({
//   secure: true,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
//   cloud_name: 'boki2435',
// });

// routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
  console.log('Connected to DB');
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
