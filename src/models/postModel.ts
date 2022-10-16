import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new Schema({
  text: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  imageId: String,
  createdAt: String,
  likes: Number,
});
const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Post', PostSchema);
