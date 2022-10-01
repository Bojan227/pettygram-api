import Post from '../models/postModel';
import Comment from '../models/commentsModel';
export const getPosts = async (req: any, res: any) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req: any, res: any) => {
  const { postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req: any, res: any) => {
  try {
    const post = await Post.create({
      ...req.body,
      createdAt: new Date(),
      likes: 0,
      createdBy: req.user[0],
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateLikes = async (req: any, res: any) => {
  const { like, _id } = req.body;

  let update = {
    $inc: {
      likes: 1,
    },
  };

  if (!like) {
    update = {
      $inc: {
        likes: -1,
      },
    };
  }

  const post = await Post.findOneAndUpdate({ _id }, update, {
    returnOriginal: false,
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
    const comments = await Comment.find({ post: postId });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ error: 'No such comments' });
  }
};
