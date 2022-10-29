import express from 'express';
import { registerUser, login, getUsers } from '../controllers/userController';
const router = express.Router();

router.get('/', getUsers);
router.post('/signup', registerUser);
router.post('/login', login);

export default router;
