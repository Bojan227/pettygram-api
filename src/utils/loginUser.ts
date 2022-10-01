import User from '../models/userModel';
import bcrypt from 'bcrypt';

type loginUserProps = {
  username: string;
  password: string;
};

export const loginUser = async ({ username, password }: loginUserProps) => {
  if (!username || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await User.findOne({ username });
  console.log(user);

  if (!user) {
    throw new Error('Wrong username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Wrong password');
  }

  return user;
};
