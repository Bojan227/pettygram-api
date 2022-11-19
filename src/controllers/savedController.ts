import User from '../models/userModel';
import Post from '../models/postModel';

export const getSavedItemsByUserId = async (req: any, res: any) => {
  try {
    const { saved } = await User.findOne({ _id: req.user[0] });
    res.status(200).json(saved);
  } catch (error) {
    res.status(400).json({ msg: 'No saved posts' });
  }
};
