import { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);

export async function getRecipes(req: Request, res: Response) {
  try {
    const { data: recipes, error } = await supabase.from('recipes').select('*');
    
    if (error) {
      throw error;
    }

    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des recettes" });
  }
}

export async function getRecipebyId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { data: recipe, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', parseInt(id))
      .single();

    if (error) {
      throw error;
    }

    return res.json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la recette" });
  }
}

export async function getRecipeByTitle(req: Request, res: Response) {
  try {
    const title = req.query.title as string;
    if (!title) {
      return res.status(400).json({ message: 'Le paramètre de requête "title" est requis' });
    }

    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .ilike('title', `%${title}%`);

    if (error) {
      throw error;
    }

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }

    return res.json(recipes[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération de la recette" });
  }
}

export async function getRecipeByIngredients(req: Request, res: Response) {
  try {
    const ingredients = req.query.ingredients as string;
    if (!ingredients) {
      return res.status(400).json({ message: 'Le paramètre de requête "ingredients" est requis' });
    }

    const { data: recipes, error } = await supabase
      .rpc('search_recipes_by_ingredients', { ingredient: ingredients });

    if (error) {
      throw error;
    }

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: 'Aucune recette trouvée' });
    }

    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des recettes" });
  }
}
