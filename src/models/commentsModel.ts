import mongoose from 'mongoose';
import Post from './postModel';
import User from './userModel';
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: String,
  post: { type: Schema.Types.ObjectId, ref: Post },
  createdBy: { type: Schema.Types.ObjectId, ref: User },
  createdAt: String,
  likes: [String],
});

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Comment', CommentSchema);
