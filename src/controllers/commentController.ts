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
  const { like, _id, userId } = req.body;

  const { likes } = await Comment.findOne({ _id });

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

  const post = await Comment.findOneAndUpdate({ _id }, update, {
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
