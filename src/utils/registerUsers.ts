import User from '../models/userModel';
import bcrypt from 'bcrypt';
import validator from 'validator';

type signUserProps = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  imageId: string;
  imageUrl: string;
};

export const signup = async ({
  username,
  password,
  firstName,
  lastName,
  imageId,
  imageUrl,
}: signUserProps) => {
  if (!username || !password || !firstName || !lastName || !imageId) {
    throw new Error('All fields must be filled');
  }

  const exist = await User?.findOne({ username });

  if (exist) {
    throw new Error('username already in use');
  }

  // validation
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hash,
    firstName,
    lastName,
    imageId,
    imageUrl,
    followers: [],
    following: [],
    saved: [],
  });

  return user;
};
