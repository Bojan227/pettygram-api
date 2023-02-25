import express from 'express';
const router = express.Router();
import { getRandomRecipe } from '../controllers/recipeController';

router.get('/', getRandomRecipe);

export default router;
