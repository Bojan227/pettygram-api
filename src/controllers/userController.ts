import { signup } from '../utils/registerUsers';
import { uploadImage } from '../utils/uploadImage';
import { loginUser } from '../utils/loginUser';
import jwt from 'jsonwebtoken';

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

export const registerUser = async (req: any, res: any) => {
  const { username, password, firstName, lastName, image } = req.body;

  try {
    const { imageUrl, imageId } = await uploadImage(image);
    const user = await signup({
      username,
      password,
      firstName,
      lastName,
      imageUrl,
      imageId,
    });

    res.status(200).json({ message: 'Successfully signed up' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const user = await loginUser(req.body);
    const { username, firstName, lastName, imageUrl, _id } = user;

    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: { username, firstName, lastName, imageUrl, _id },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
