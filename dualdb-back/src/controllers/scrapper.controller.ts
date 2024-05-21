import { JSDOM } from 'jsdom';
import fs from 'fs';
import Recipe from '../models/mongoDB/Recipes.models';

interface RecipeDetails {
  title: string;
  ingredients: string[];
  preparationStep: string[];
}

async function scrapper(): Promise<void> {
  const url = "https://www.allrecipes.com/recipes/17561/lunch/";
  try {
    const response = await fetch(url);
    const body = await response.text();
    const document = new JSDOM(body).window.document;

    const recipeUrls: string[] = [];
    const recipeLinks = document.querySelectorAll("a.mntl-card-list-items[href^='https://www.allrecipes.com/recipe/']");
    recipeLinks.forEach(link => {
      recipeUrls.push((link as HTMLAnchorElement).href);
    });

    const tasks: Promise<RecipeDetails | null>[] = recipeUrls.map(link => scrapeRecipeDetails(link));
    const scrappedPages = await Promise.all(tasks);

    fs.writeFile('data.json', JSON.stringify(scrappedPages), (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture du fichier :", err);
      } else {
        console.log("Données scrapées écrites dans le fichier 'data.json'.");
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

    const ingredientsElements = document.querySelectorAll("span[data-ingredient-name='true']");
    const ingredients = Array.from(ingredientsElements).map(ingredientElement => ingredientElement.textContent?.trim() || '');

    // Étapes de préparation de la recette
    const stepsElements = document.querySelectorAll("div.recipe__steps-content ol li p");
    const preparationStep = Array.from(stepsElements).map(stepElement => stepElement.textContent?.trim() || '');

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

async function read(): Promise<void> {
  try {
    const jsonData = fs.readFileSync('data.json', 'utf8');
    const data = JSON.parse(jsonData);
    return console.log(data);
  } catch (error) {
    console.error('An error occurred while reading JSON:', error);
  }
}

async function populate(): Promise<void> {
  try {
    const recipesData = fs.readFileSync('data.json', 'utf8');
    const recipes = JSON.parse(recipesData);
    await Recipe.insertMany(recipes);
    console.log('Base de données peuplée avec succès !');
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  }
}

export { scrapper, read, populate };