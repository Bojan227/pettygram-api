import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  imageId: String,
  imageUrl: String,
});

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('User', UserSchema);
