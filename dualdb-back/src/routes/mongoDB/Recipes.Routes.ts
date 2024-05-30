import express from 'express';
import { 
    getRecipes, 
    getRecipebyId,
    getRecipeByTitle,
    getRecipeByIngredients
} from '../../controllers/mongoDB/Recipes.controller';

const router = express.Router();

router.get('/', getRecipes);
router.get('/id/:id', getRecipebyId);
router.get('/title', getRecipeByTitle);
router.get('/ingredients', getRecipeByIngredients);

/**
 * @openapi
 * /mongodb/recipes/:
 *   get:
 *     description: Récupère toutes les recipe d'un utilisateur.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès. Retourne toutes les recipes de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Token non fourni ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la récupération des recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @openapi
 * /mongodb/recipes/{id}:
 *   get:
 *     description: Récupère une recette par son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recette à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès. Retourne la recette demandée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Token non fourni ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Recette non trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la récupération de la recette.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @openapi
 * /mongodb/recipes/title:
 *   get:
 *     summary: Récupère une recette par titre
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: Le titre de la recette
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 *                 instructions:
 *                   type: string
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @openapi
 * /mongodb/recipes/ingredients:
 *   get:
 *     summary: Récupère des recettes par ingrédients
 *     parameters:
 *       - in: query
 *         name: ingredients
 *         required: true
 *         description: Les ingrédients de la recette (séparés par des virgules)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   ingredients:
 *                     type: array
 *                     items:
 *                       type: string
 *                   instructions:
 *                     type: string
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Aucune recette trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @openapi
 * /scrapper/populate:
 *   get:
 *     summary: Peuple la base de données MongoDB avec des recettes à partir d'un fichier JSON.
 *     description: Lit les données des recettes à partir d'un fichier JSON, les insère dans la base de données MongoDB et retourne un message de succès en cas de réussite.
 *     responses:
 *       200:
 *         description: Base de données peuplée avec succès.
 *       500:
 *         description: Erreur interne du serveur lors du peuplement de la base de données.
 */

/**
 * @openapi
 * /postgres/recipes/:
 *   get:
 *     description: Récupère toutes les recipe d'un utilisateur.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès. Retourne toutes les recipes de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Token non fourni ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la récupération des recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @openapi
 * /postgres/recipes/{id}:
 *   get:
 *     description: Récupère une recette par son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recette à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès. Retourne la recette demandée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Token non fourni ou invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Recette non trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur lors de la récupération de la recette.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


/**
 * @openapi
 * /postgres/recipes/name:
 *   get:
 *     summary: Récupère une recette par titre
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: Le titre de la recette
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 ingredients:
 *                   type: string
 *                 instructions:
 *                   type: string
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @openapi
 * /postgres/recipes/ingredients:
 *   get:
 *     summary: Récupère des recettes par ingrédients
 *     parameters:
 *       - in: query
 *         name: ingredients
 *         required: true
 *         description: Les ingrédients de la recette
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   ingredients:
 *                     type: string
 *                   instructions:
 *                     type: string
 *       400:
 *         description: Paramètre manquant
 *       404:
 *         description: Aucune recette trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @openapi
 * /scrapper/postgres/populate:
 *   get:
 *     summary: Peuple la base de données PostgreSQL avec des recettes à partir d'un fichier JSON.
 *     description: Lit les données des recettes à partir d'un fichier JSON, les insère dans la base de données PostgreSQL et retourne un message de succès en cas de réussite.
 *     responses:
 *       200:
 *         description: Base de données peuplée avec succès.
 *       500:
 *         description: Erreur interne du serveur lors du peuplement de la base de données.
 */

/**
 * @openapi
 * /scrapper:
 *   get:
 *     summary: Scrappe les recettes de la page de recettes Allrecipes.
 *     description: Scrappe les détails des recettes (titre, ingrédients, étapes de préparation) à partir d'une page Allrecipes spécifique.
 *     responses:
 *       200:
 *         description: Succès. Les données des recettes sont enregistrées dans un fichier JSON.
 *       500:
 *         description: Erreur interne du serveur lors du scraping.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         ingredients:
 *           type: string
 *         preparationStep:
 *           type: string
 *       required:
 *         - id
 *         - title
 *         - ingredients
 *         - preparationStep
 */


export default router;
