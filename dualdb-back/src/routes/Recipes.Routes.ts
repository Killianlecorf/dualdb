import express from 'express';
import { 
    getRecipes, 
    getRecipebyId,
    getRecipeByTitle,
    getRecipeByIngredients
} from '../controllers/Recipes.controller';

const router = express.Router();

router.get('/', getRecipes);
router.get('/id/:id', getRecipebyId);
router.get('/name', getRecipeByTitle);
router.get('/ingredients', getRecipeByIngredients);

export default router;