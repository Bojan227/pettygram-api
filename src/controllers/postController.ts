import Post from '../models/postModel';
import Comment from '../models/commentsModel';
import { convertImages } from '../utils/convertImages';

export const getPosts = async (req: any, res: any) => {
  const { page } = req.query;

  try {
    const posts = await Post.find({})
      .skip(page * 5)
      .limit(5)
      .populate({
        path: 'createdBy',
        select: ['_id', 'username', 'imageUrl', 'saved'],
      })
      .sort({ _id: -1 });

    const numberOfPosts = await Post.aggregate([{ $count: 'posts' }]);
    res.status(200).json({ posts, numberOfPosts: numberOfPosts[0].posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostsByUserId = async (req: any, res: any) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ createdBy: userId }).populate({
      path: 'createdBy',
      select: ['_id', 'username', 'imageUrl', 'saved'],
    }).sort({ _id: -1 });
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
      select: ['_id', 'username', 'imageUrl', 'saved'],
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req: any, res: any) => {
  const { text, images } = req.body;

  try {
    const { imageUrls, imageIds } = await convertImages(images);

    const post = await Post.create({
      text,
      createdAt: new Date(),
      imageUrl: imageUrls,
      imageId: imageIds,
      likes: [],
      createdBy: req.user[0],
    });

    const postWithUser = await post.populate({
      path: 'createdBy',
      select: ['_id', 'username', 'imageUrl', 'saved'],
    });
    res.status(200).json(postWithUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateLikes = async (req: any, res: any) => {
  const { postId } = req.body;
  const { likes } = await Post.findOne({ _id: postId });

  const update = {
    $set: {
      likes: likes.find(
        (loggedUser:string) => loggedUser === req.user[0]._id.toString()
      )
        ? likes.filter((id:String) => id !== req.user[0]._id.toString())
        : [...likes, req.user[0]._id.toString()],
    },
  };

  const post = await Post.findOneAndUpdate({ _id: postId }, update, {
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
