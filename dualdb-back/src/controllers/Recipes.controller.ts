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