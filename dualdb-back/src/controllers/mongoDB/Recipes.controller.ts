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
