import mongoose from 'mongoose';
import User from './userModel';
const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    members: Array,
    senderId: { type: Schema.Types.ObjectId, ref: User },
    receiverId: { type: Schema.Types.ObjectId, ref: User },
    message: String,
  },
  { timestamps: true }
);

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Chat', ChatSchema);
