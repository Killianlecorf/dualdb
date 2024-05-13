import express from 'express';
import { getRecipes, getRecipebyId, createRecipe, deleteById, updateRecipe } from '../controllers/Recipes.controller';
import { verifyToken } from '../middleware/verificationToken.middleware';

const router = express.Router();

router.get('/', verifyToken, getRecipes);
router.get('/:id', verifyToken, getRecipebyId);
router.post('/', verifyToken, createRecipe);
router.delete('/:id', verifyToken, deleteById);
router.put('/:id', verifyToken, updateRecipe);

/**
 * @openapi
 * /recipe/:
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
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         userId:
 *           type: integer
 *       required:
 *         - id
 *         - title
 *         - content
 *         - userId
 */

export default router;