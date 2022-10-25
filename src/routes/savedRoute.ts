import express from 'express';
const router = express.Router();
import { getSavedItemsByUserId } from '../controllers/savedController';

router.get('/:userId', getSavedItemsByUserId);

export default router;
