import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;
type signUserProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  statics: {};
};

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

UserSchema.statics.signup = async function ({
  username,
  password,
  firstName,
  lastName,
}: signUserProps) {
  if (!username || !password) {
    throw new Error('All fields must be filled');
  }

  const exist = await this?.findOne({ username });

  if (exist) {
    throw new Error('username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
    firstName,
    lastName,
  });

  return user;
};

const myDB = mongoose.connection.useDb('insta');

export default myDB.model('User', UserSchema);
