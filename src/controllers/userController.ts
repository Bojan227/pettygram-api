import { signup } from '../utils/registerUsers';
import { uploadImage } from '../utils/uploadImage';
import { loginUser } from '../utils/loginUser';
import User from '../models/userModel';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ msg: 'Users cannot be found' });
  }
};

export const getUserById = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const user = await User.findById({ _id: userId }, { password: 0 });

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
  const { followers } = await User.findOne({
    _id: new mongoose.Types.ObjectId(userId),
  });
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

  await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId) },
    {
      $set: {
        followers: followers.includes(req.user[0]._id)
          ? followers.filter((id) => id !== req.user[0]._id.toString())
          : [...followers, req.user[0]._id],
      },
    },
    { returnOriginal: false }
  );

  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).json({ error: 'User unknown' });
  }
};
