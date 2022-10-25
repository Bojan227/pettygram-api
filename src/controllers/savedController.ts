export const getSavedItemsByUserId = async (req: any, res: any) => {
  const { userId } = req.params;
  console.log(userId);
  res.status(200).json({ id: 'wawom' });
  //   try {
  //     const posts = await Post.find({ createdBy: userId }).populate({
  //       path: 'createdBy',
  //       select: ['_id', 'username', 'imageUrl'],
  //     });
  //     res.status(200).json(posts);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
};
