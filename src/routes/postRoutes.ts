import express from 'express';
const router = express.Router();
import {
  createPost,
  getPosts,
  deletePost,
  getPostById,
  updateLikes,
  getSpecificPostComments,
} from '../controllers/postController';
import { requireAuth } from '../middleware/requireAuth';

router.get('/', getPosts);

router.get('/:postId', getPostById);
router.get('/:postId/comments', getSpecificPostComments);

router.post('/', requireAuth, createPost);

router.put('/', requireAuth, updateLikes);

router.delete('/', deletePost);
export default router;
