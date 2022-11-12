import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  followers: { type: [String], required: true },
  following: { type: [String], required: true },
});

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('User', UserSchema);
