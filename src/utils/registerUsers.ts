import User from '../models/userModel';
import bcrypt from 'bcrypt';

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

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hash,
    firstName,
    lastName,
    imageId,
    imageUrl,
  });

  return user;
};
