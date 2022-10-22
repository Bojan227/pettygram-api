import Post from '../models/postModel';
import Comment from '../models/commentsModel';
import { uploadImage } from '../utils/uploadImage';

export const getPosts = async (req: any, res: any) => {
  try {
    const posts = await Post.find({}).populate({
      path: 'createdBy',
      select: ['_id', 'username', 'imageUrl'],
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req: any, res: any) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId }).populate({
      path: 'createdBy',
      select: ['_id', 'username', 'imageUrl'],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req: any, res: any) => {
  const { text, image } = req.body;

  try {
    const { imageUrl, imageId } = await uploadImage(image);

    const post = await Post.create({
      text,
      createdAt: new Date(),
      imageUrl,
      imageId,
      likes: [],
      createdBy: req.user[0],
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateLikes = async (req: any, res: any) => {
  const { like, _id, userId } = req.body;

  const { likes } = await Post.findOne({ _id });

  let update = {
    $set: {
      likes: [...likes, userId],
    },
  };

  if (!like) {
    update = {
      $set: {
        likes: likes.filter((id) => id !== userId),
      },
    };
  }

  const post = await Post.findOneAndUpdate({ _id }, update, {
    returnOriginal: false,
  }).populate({
    path: 'createdBy',
    select: ['_id', 'username', 'imageUrl'],
  });

  if (!post) {
    return res.status(400).json({ msg: 'No such post' });
  } else {
    return res.status(200).json({ msg: 'Success', post });
  }
};

export const deletePost = async (req: any, res: any) => {
  const { postId } = req.body;

  try {
    const post = await Post.findOneAndDelete({ _id: postId });

    res.status(200).json({ message: 'Your post is deleted' });
  } catch (error) {
    res.status(401).json({ msg: 'No such post!' });
  }
};

export const getSpecificPostComments = async (req: any, res: any) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId }).populate({
      path: 'createdBy',
      select: ['_id', 'username', 'imageUrl'],
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ error: 'No such comments' });
  }
};
