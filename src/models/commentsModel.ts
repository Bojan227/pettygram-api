import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: String,
  likes: Number,
});

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Comment', CommentSchema);
