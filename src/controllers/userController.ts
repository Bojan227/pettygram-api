import { signup } from '../utils/registerUsers';
import { loginUser } from '../utils/loginUser';
import jwt from 'jsonwebtoken';

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

export const registerUser = async (req: any, res: any) => {
  try {
    const user = await signup(req.body);

    res.status(200).json({ message: 'Successfully signed up' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const user = await loginUser(req.body);

    const token = createToken(user._id);

    res.status(200).json({
      token,
      username: user.username,
      firstName: user.firstName,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
