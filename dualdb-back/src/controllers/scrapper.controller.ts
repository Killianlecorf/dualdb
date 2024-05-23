import { JSDOM } from 'jsdom';
import fs from 'fs';
import IRecipe from '../models/mongoDB/Recipes.models';
import { orm } from "../../index";
import { Recipes } from '../models/Recipes.model';

interface RecipeDetails {
  title: string;
  ingredients: string[];
  preparationStep: string[];
}

async function scrapper(): Promise<void> {
  const URL = "https://www.allrecipes.com/recipes/17561/lunch/";
  try {
    const response = await fetch(URL);
    const body = await response.text();
    const document = new JSDOM(body).window.document;

    const recipeUrls: string[] = [];
    const recipeLinks = document.querySelectorAll("a.mntl-card-list-items[href^='https://www.allrecipes.com/recipe/']");
    recipeLinks.forEach(link => {
      recipeUrls.push((link as HTMLAnchorElement).href);
    });

    const tasks: Promise<RecipeDetails | null>[] = recipeUrls.map(link => scrapeRecipeDetails(link));
    const Pages = await Promise.all(tasks);

    fs.writeFile('data.json', JSON.stringify(Pages), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier :", err);
      } else {
        return console.log("Données scrapées écrites dans le fichier 'data.json'.");
      }
    });
  } catch (error) {
    console.error('Error while scraping:', error);
  }
}

async function scrapeRecipeDetails(recipeUrl: string): Promise<RecipeDetails | null> {
  try {
    const response = await fetch(recipeUrl);
    const body = await response.text();
    const document = new JSDOM(body).window.document;

    // Titre de la recette
    const titleElement = document.querySelector("h1");
    const title = titleElement ? titleElement.textContent?.trim() || "Titre non trouvé" : "Titre non trouvé";

    const ingredientsRecipes = document.querySelectorAll("span[data-ingredient-name='true']");
    const ingredients = Array.from(ingredientsRecipes).map(ingredientRecipe => ingredientRecipe.textContent?.trim() || '');

    // Étapes de préparation de la recette
    const stepsRecipes = document.querySelectorAll("div.recipe__steps-content ol li p");
    const preparationStep = Array.from(stepsRecipes).map(stepRecipe => stepRecipe.textContent?.trim() || '');

    const recipeDetails: RecipeDetails = {
      title,
      ingredients,
      preparationStep
    };

    return recipeDetails;
  } catch (error) {
    console.error('Erreur lors du scraping de la recette :', error);
    return null;
  }
}

async function populate(): Promise<void> {
  try {
    const dataRecipes = fs.readFileSync('data.json', 'utf8');
    const recipes = JSON.parse(dataRecipes);
    await IRecipe.insertMany(recipes);
    return console.log('Base de données peuplée avec succès !');
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  }
}

async function populatePostgres(): Promise<void> {
  const mikro = await orm;
  const em = mikro.em.fork();

  try {
    const dataRecipes = fs.readFileSync('data.json', 'utf8');
    const recipes: RecipeDetails[] = JSON.parse(dataRecipes);

    for (const recipe of recipes) {
      const recipeEntity = em.create(Recipes, {
        title: recipe.title,
        ingredients: recipe.ingredients,
        preparationStep: recipe.preparationStep,
      });

      em.persist(recipeEntity);
    }

    await em.flush();
    return console.log('Base de données peuplée avec succès !');
  } catch (error) {
    return console.error('Erreur lors du peuplement de la base de données :', error);
  } finally {
    await mikro.close();
  }
}

export { scrapper, populate, populatePostgres };