import { signup } from '../utils/registerUsers';
import { uploadImage } from '../utils/uploadImage';
import { loginUser } from '../utils/loginUser';
import { deleteImage } from '../utils/deleteImage';
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
      imageId,
      _id,
      followers,
      following,
      saved,
    } = user;

    const token = createToken(user._id);

    res.status(200).json({
      token,
      user: {
        username,
        firstName,
        lastName,
        imageUrl,
        imageId,
        _id,
        followers,
        following,
        saved,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserFollowStatus = async (req: any, res: any) => {
  const { userId } = req.body;

  const loggedUser = await User.findOne({ _id: req.user[0] }, { password: 0 });
  // User to follow
  const {
    username,
    firstName,
    lastName,
    imageUrl,
    followers,
    following,
    saved,
  } = await User.findOne(
    {
      _id: new mongoose.Types.ObjectId(userId),
    },
    { password: 0 }
  );

  const newUser = {
    _id: userId,
    username,
    firstName,
    lastName,
    imageUrl,
    followers,
    following,
    saved,
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user[0] },
    {
      $set: {
        following: loggedUser.following.find(
          ({ _id }) => _id.toString() === userId
        )
          ? loggedUser.following.filter(({ _id }) => _id.toString() !== userId)
          : [...loggedUser.following, newUser],
      },
    },

    {
      returnOriginal: false,
    }
  ).select('-password');

  const updatedUser = await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId) },
    {
      $set: {
        followers: followers?.find(
          ({ _id }) => _id.toString() === req.user[0]._id.toString()
        )
          ? followers?.filter(
              ({ _id }) => _id.toString() !== req.user[0]._id.toString()
            )
          : [...followers, user],
      },
    },
    { returnOriginal: false }
  ).select('-password');

  if (user) {
    return res.status(200).json({ user, updatedUser });
  } else {
    return res.status(404).json({ error: 'User unknown' });
  }
};

export const editUserInfo = async (req: any, res: any) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user[0] },
      req.body,
      { returnOriginal: false }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProfilePicture = async (req: any, res: any) => {
  const { pictureId } = req.body;

  try {
    await deleteImage(pictureId);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user[0] },
      { imageUrl: '', imageId: '' },
      { returnOriginal: false }
    ).select('-password');

    console.log(updatedUser);
    res.status(200).json({
      message: 'Your photo was successfully deleted',
      updatedUser,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const changeProfilePicture = async (req: any, res: any) => {
  const { newImage } = req.body;
  try {
    const { imageUrl, imageId } = await uploadImage(newImage);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user[0] },
      { imageUrl, imageId },
      { returnOriginal: false }
    ).select('-password');

    res
      .status(200)
      .json({ message: 'Your photo was successfully updated', updatedUser });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
