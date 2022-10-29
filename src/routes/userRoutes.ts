import express from 'express';
import {
  registerUser,
  login,
  getUsers,
  getUserById,
} from '../controllers/userController';
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/signup', registerUser);
router.post('/login', login);

export default router;
