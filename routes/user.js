const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const roleCheck = require('../middleware/roleCheck');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec les informations fournies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur dans la requête ou l'utilisateur existe déjà
 */
router.post('/signup', userCtrl.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     description: Authentifie un utilisateur avec l'adresse e-mail et le mot de passe fournis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token d'authentification JWT
 *       401:
 *         description: Authentification échouée
 */
router.post('/login', userCtrl.login);

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     description: Route pour obtenir la liste de tous les utilisateurs. Nécessite une authentification.
 *     responses:
 *       200:
 *         description: Une liste d'utilisateurs
 */
router.get('/', auth, userCtrl.getUsers);

/**
 * @swagger
 * /api/auth/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     description: Route pour obtenir un utilisateur avec un ID spécifique. Nécessite une authentification.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur avec l'ID spécifié
 */
router.get('/:id', auth, userCtrl.getUser);

/**
 * @swagger
 * /api/auth/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID
 *     description: Route pour mettre à jour un utilisateur avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'utilisateur mis à jour
 */
router.put('/:id', auth, roleCheck(['admin']), userCtrl.updateUser);

/**
 * @swagger
 * /api/auth/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     description: Route pour supprimer un utilisateur avec un ID spécifique. Nécessite une authentification et le rôle 'admin'.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: L'utilisateur supprimé
 */
router.delete('/:id', auth, roleCheck(['admin']), userCtrl.deleteUser);

module.exports = router;