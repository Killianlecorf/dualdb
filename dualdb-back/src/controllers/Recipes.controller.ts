import { Request, Response } from 'express';
import { Recipes } from '../models/Recipes.model';
import { orm } from "../../index";

export async function getRecipes(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const recipesRepository = em.getRepository(Recipes);

    const recipes = await recipesRepository.findAll();
    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }
}

export async function getRecipebyId(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();
  try {
    const recipesRepository = em.getRepository(Recipes);
    const { id } = req.params;
    const recipes = await recipesRepository.findOne({ id: parseInt(id) });
    console.log(recipes)
    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la récupération recipes" });
  }
}

export async function getRecipeByTitle(req: Request, res: Response): Promise<Response> {
  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const title = req.query.title as string;
    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }

    const recipe = await em.findOne(Recipes, { title: { $ilike: `%${title}%` } }); 

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.json(recipe);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
}

export async function getRecipeByIngredients(req: Request, res: Response): Promise<Response> {
  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const ingredients = req.query.ingredients as string;
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients query parameter is required' });
    }

    const recipes = await em.getConnection().execute(
      `SELECT * FROM "recipes" WHERE "ingredients"::text ILIKE ?`,
      [`%${ingredients}%`]
    );
    
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found' });
    }

    return res.json(recipes);
  } catch (error:any) {
    return res.status(500).json({ message: error.message });
  }
}