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
