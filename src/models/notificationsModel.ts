import mongoose from 'mongoose';
const { Schema } = mongoose;
import User from './userModel';

const NotificationsSchema = new Schema({
  message: String,
  sender: { type: Schema.Types.ObjectId, ref: User },
  receiver: { type: Schema.Types.ObjectId, ref: User },
  read: Boolean,
  action: String,
});
const myDB = mongoose.connection.useDb('insta');

export default myDB.model('Notifications', NotificationsSchema);
