import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import {
  registerUser,
  login,
  getUsers,
  getUserById,
  updateUserFollowStatus,
  editUserInfo,
} from '../controllers/userController';
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signup', registerUser);
router.post('/login', login);

router.use(requireAuth);
router.put('/', updateUserFollowStatus);
router.put('/edit', editUserInfo);

export default router;
