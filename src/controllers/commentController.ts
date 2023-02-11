import Comment from '../models/commentsModel';

export const createComment = async (req: any, res: any) => {
  try {
    const commment = await Comment.create({
      ...req.body,
      createdAt: new Date(),
      likes: [],
      createdBy: req.user[0],
    });

    return res.status(200).json({ message: 'Comment created' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCommentLikes = async (req: any, res: any) => {
  const { postId } = req.body;

  const { likes } = await Comment.findOne({ _id: postId });

  const update = {
    $set: {
      likes: likes.find(
        (loggedUser) => loggedUser === req.user[0]._id.toString()
      )
        ? likes.filter((id) => id !== req.user[0]._id.toString())
        : [...likes, req.user[0]._id.toString()],
    },
  };

  const post = await Comment.findOneAndUpdate({ _id: postId }, update, {
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

export const editComment = async (req: any, res: any) => {
  const { commentId, comment } = req.body;

  const newComment = await Comment.findOneAndUpdate(
    { _id: commentId },
    { comment },
    { returnOriginal: false }
  );

  if (!newComment) {
    return res.status(400).json({ msg: 'No such comment' });
  } else {
    return res.status(200).json({ msg: 'Success', newComment });
  }
};

export const deleteComment = async (req: any, res: any) => {
  const { commentId } = req.body;
  try {
    await Comment.findOneAndDelete({ _id: commentId });
    return res.status(200).json({ msg: 'Success' });
  } catch (error) {
    return res.status(400).json({ error: 'unable to delete the comment' });
  }
};
