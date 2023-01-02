import Notifications from '../models/notificationsModel';

export const getNotificationsByReceiverId = async (req: any, res: any) => {
  const { receiverId } = req.body;
  try {
    const notifications = await Notifications.find({
      receiver: receiverId,
    }).populate({ path: 'sender', select: ['_id', 'username', 'imageUrl'] });

    res.status(200).json(notifications);
  } catch (error) {
    res.staus(404).json({ msg: 'Cannot find any any notifications' });
  }
};
