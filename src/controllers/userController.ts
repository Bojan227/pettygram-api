import { signup } from '../utils/registerUsers';
import { uploadImage } from '../utils/uploadImage';
import { loginUser } from '../utils/loginUser';
import User from '../models/userModel';

import jwt from 'jsonwebtoken';

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

export const getUsers = async (req: any, res: any) => {
  console.log(req.user);
  try {
    const users = await User.find({}, { password: 0 });

    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: 'Users cannot be found' });
  }
};

export const getUserById = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId });

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: 'User unknown' });
  }
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
    const {
      username,
      firstName,
      lastName,
      imageUrl,
      _id,
      followers,
      following,
    } = user;

    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: {
        username,
        firstName,
        lastName,
        imageUrl,
        _id,
        followers,
        following,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserData = async (req: any, res: any) => {
  const { userId } = req.body;
  const { following } = await User.findOne({ _id: req.user[0] });

  const user = await User.findOneAndUpdate(
    { _id: req.user[0] },
    {
      $set: {
        following: following.includes(userId)
          ? following.filter((id) => id !== userId)
          : [...following, userId],
      },
    },
    {
      returnOriginal: false,
    }
  );

  if (user) {
    return res.status(200).json({ id: userId, user });
  } else {
    return res.status(404).json({ error: 'User unknown' });
  }
};
