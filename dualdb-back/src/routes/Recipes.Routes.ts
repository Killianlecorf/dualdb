import express from 'express';
import { getRecipes, getRecipebyId} from '../controllers/Recipes.controller';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipebyId);

export default router;