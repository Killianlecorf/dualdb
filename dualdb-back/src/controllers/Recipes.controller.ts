import { Request, Response } from 'express';
import { Recipes } from '../models/Recipes.model';
import { UserAccount } from '../models/User.model';
import { orm } from "../../index";
import jwt from 'jsonwebtoken';

export async function getRecipes(req: Request, res: Response) {
  const mikro = await orm;
  const em = mikro.em.fork();

  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  const token = req.cookies.jwt;
  let userId: number;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    userId = decodedToken.userId;
    const recipesRepository = em.getRepository(Recipes);

    const recipes = await recipesRepository.find({ UserAccount : userId });
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

export async function createRecipe(req: Request, res: Response) {
  const { title, content } = req.body;
  
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  if (!title || !content) {
    return res.status(400).json({message: "Le champs titre et contenu sont obligatoire"})
  }

  const token = req.cookies.jwt;
  let userId: number;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    userId = decodedToken.userId;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token invalide" });
  }


  const mikro = await orm;
  const em = mikro.em.fork();
  try {
    const userRepository = em.getRepository(UserAccount);

    const user = await userRepository.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const recipes = new Recipes();
    recipes.title = title;
    recipes.content = content;
    recipes.UserAccount = user;

    await em.persistAndFlush(recipes);
    return res.status(201).json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la création de la recipes" });
  }
}

export async function deleteById(req: Request, res: Response) {

  const id = req.params.id;

  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const recipesRepository = em.getRepository(Recipes);
    
    const recipes = await recipesRepository.findOne({ id: parseInt(id) });

    if (!recipes) {
      return res.status(404).json({ message: "Recipe non trouvée" });
    }

    await em.removeAndFlush(recipes);
    return res.status(200).json({ message: "Recipe supprimée avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression de la Recipe" });
  }
}

export async function updateRecipe(req: Request, res: Response) {
  const id = req.params.id;
  const { title, content } = req.body;

  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const recipeRepository = em.getRepository(Recipes);

    const recipes = await recipeRepository.findOne({ id: parseInt(id) });

    if (!recipes) {
      return res.status(404).json({ message: "Recipe non trouvée" });
    }

    recipes.title = title;
    recipes.content = content;

    await em.persistAndFlush(recipes);

    return res.status(200).json({ message: "Recipe modifiée avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la modification de la Recipe" });
  }
}