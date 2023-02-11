import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import {
  createComment,
  updateCommentLikes,
  editComment,
} from '../controllers/commentController';
const router = express.Router();

router.use(requireAuth);

router.post('/', createComment);
router.put('/', updateCommentLikes);
router.put('/edit', editComment);

export default router;
