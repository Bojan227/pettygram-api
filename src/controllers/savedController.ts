import User from '../models/userModel';
import Post from '../models/postModel';
import mongoose from 'mongoose';

export const getSavedItemsByUserId = async (req: any, res: any) => {
  try {
    const { saved } = await User.findOne({ _id: req.user[0] });
    const validRecords = await Post.find({ _id: { $in: saved } });

    res.status(200).json(validRecords);
  } catch (error) {
    res.status(400).json({ msg: 'No saved posts' });
  }
};

export const updateSavedPosts = async (req: any, res: any) => {
  const { postId } = req.body;

  const { saved } = await User.findOne({ _id: req.user[0] });
  const post = await Post.findOne({ _id: new mongoose.Types.ObjectId(postId) });

  const update = {
    $set: {
      saved: saved.find(({ _id }) => _id.toString() === postId)
        ? saved.filter(({ _id }) => _id.toString() !== postId)
        : [...saved, post],
    },
  };

  try {
    const user = await User.findOneAndUpdate({ _id: req.user[0] }, update, {
      returnOriginal: false,
    }).select('-password');
    res.status(200).json({ user, post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
