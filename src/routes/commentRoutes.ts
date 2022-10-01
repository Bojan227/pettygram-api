import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import {
  createComment,
  updateCommentLikes,
} from '../controllers/commentController';
const router = express.Router();

router.use(requireAuth);

router.post('/', createComment);
router.put('/', updateCommentLikes);

export default router;
