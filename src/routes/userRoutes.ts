import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import {
  registerUser,
  login,
  getUsers,
  getUserById,
  updateUserData,
} from '../controllers/userController';
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signup', registerUser);
router.post('/login', login);
router.put('/', requireAuth, updateUserData);

export default router;
