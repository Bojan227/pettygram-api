import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { getNotificationsByReceiverId } from '../controllers/notificationsController';
const router = express.Router();

router.get('/', getNotificationsByReceiverId);

export default router;
