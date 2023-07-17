const express = require('express');
const auth = require('../middleware/auth');
const guidesCtrl = require('../controllers/guides');
const multer = require('../config/multer-config');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

/**
 * @swagger
 * /guides:
 *   post:
 *     summary: Crée un nouvel objet
 *     tags: [Guides]
 *     description: Route pour créer un nouvel objet. Nécessite une authentification et les rôles 'admin' ou 'redacteur'.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *                 description: "L'ID d'une catégorie existante dans la base de données. Les catégories sont représentées par des étoiles : * pour les catégories principales, ** pour les sous-catégories."
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: L'objet créé
 */
router.post('/', auth, roleCheck(['admin', 'redacteur']), multer, guidesCtrl.createThing);

/**
 * @swagger
 * /guides/{id}:
 *   get:
 *     summary: Récupère un objet par son ID
 *     tags: [Guides]
 *     description: Route pour récupérer un objet avec un ID spécifique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'objet avec l'ID spécifié
 */
router.get('/:id', guidesCtrl.getOneThing);

/**
 * @swagger
 * /guides/{id}:
 *   put:
 *     summary: Met à jour un objet par son ID
 *     tags: [Guides]
 *     description: Route pour mettre à jour un objet avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               categoryId:
 *                 type: string
 *                 description: "L'ID d'une catégorie existante dans la base de données. Les catégories sont représentées par des étoiles : * pour les catégories principales, ** pour les sous-catégories."
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: L'objet mis à jour
 */
router.put('/:id', auth, roleCheck(['admin', 'redacteur']), multer, guidesCtrl.modifyThing);

/**
 * @swagger
 * /guides/{id}:
 *   delete:
 *     summary: Supprime un objet par son ID
 *     tags: [Guides]
 *     description: Route pour supprimer un objet avec un ID spécifique. Nécessite une authentification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'objet supprimé
 */
router.delete('/:id', auth,roleCheck(['admin', 'redacteur']), guidesCtrl.deleteThing);

/**
 * @swagger
 * /guides:
 *   get:
 *     summary: Récupère la liste de tous les objets
 *     tags: [Guides]
 *     description: Route pour récupérer la liste de tous les objets
 *     responses:
 *       200:
 *         description: Une liste d'objets
 */
router.get('/', guidesCtrl.getThings);
// POST /api/v1/guides/:id/report - Signaler un guide
router.post('/:id/report',  guidesCtrl.reportGuide);


module.exports = router;