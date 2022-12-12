import mongoose from 'mongoose';
import User from './userModel';
const { Schema } = mongoose;

const ChatSchema = new Schema({
  room: String,
  author: { type: Schema.Types.ObjectId, ref: User },
  receiver: { type: Schema.Types.ObjectId, ref: User },
  message: String,
  time: String,
});

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Chat', ChatSchema);
