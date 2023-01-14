import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from './userModel';

const PostSchema = new Schema({
  text: String,
  createdBy: { type: Schema.Types.ObjectId, ref: User },
  imageUrl: String || [String],
  imageId: String || [String],
  createdAt: String,
  likes: [String],
});
const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Post', PostSchema);
