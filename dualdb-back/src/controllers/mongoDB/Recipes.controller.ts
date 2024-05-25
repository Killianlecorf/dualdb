import { Request, Response } from 'express';
import RecipesModel from '../../models/mongoDB/Recipes.models';

export async function getRecipes(req: Request, res: Response) {
  try {
    const recipes = await RecipesModel.find();
    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des recettes" });
  }
}

export async function getRecipebyId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const recipe = await RecipesModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette introuvable" });
    }
    return res.json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la recette" });
  }
}

export async function getRecipeByTitle(req: Request, res: Response){
  try {
    const title = req.query.title;
    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }

    const recipe = await RecipesModel.findOne({ title: { $regex: title, $options: 'i' } });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export async function getRecipeByIngredients(req: Request, res: Response): Promise<Response> {
  try {
    const ingredients = req.query.ingredients as string;
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients query parameter is required' });
    }

    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    const recipes = await RecipesModel.find({ ingredients: { $in: ingredientsArray } });

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found' });
    }

    return res.json(recipes);
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
}