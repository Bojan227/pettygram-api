import Comment from '../models/commentsModel';

export const createComment = async (req: any, res: any) => {
  try {
    const commment = await Comment.create({
      ...req.body,
      createdAt: new Date(),
      likes: 0,
      createdBy: req.user[0],
    });

    return res.status(200).json(commment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateCommentLikes = async (req: any, res: any) => {
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

  const post = await Comment.findOneAndUpdate({ _id }, update, {
    returnOriginal: false,
  });

  if (!post) {
    return res.status(400).json({ msg: 'No such post' });
  } else {
    return res.status(200).json({ msg: 'Success', post });
  }
};
