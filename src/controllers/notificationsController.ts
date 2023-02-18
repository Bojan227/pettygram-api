import Notifications from '../models/notificationsModel';

export const getNotificationsByReceiverId = async (req: any, res: any) => {
  const { receiverId } = req.query;
  try {
    const notifications = await Notifications.find({
      receiver: receiverId,
    })
      .populate({ path: 'sender', select: ['_id', 'username', 'imageUrl'] })
      .sort({ _id: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.staus(404).json({ msg: 'Cannot find any any notifications' });
  }
};

export const updateUnreadNotifications = async (req: any, res: any) => {
  const { receiverId } = req.query;
  try {
    const notifications = await Notifications.updateMany(
      {
        receiver: receiverId,
      },
      { read: true },
      { returnOriginal: false }
    );

    res.status(200).json({ msg: 'Successfully updated' });
  } catch (error) {
    res.status(404).json({ msg: 'Cannot find any any notifications' });
  }
};
