import express from 'express';
const router = express.Router();
import { getTaggedItemsByUserId } from '../controllers/taggedController';

router.get('/:userId', getTaggedItemsByUserId);

export default router;
