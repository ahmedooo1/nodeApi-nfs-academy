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



router.get('/',auth, userCtrl.getUsers);

router.get('/:id', auth, userCtrl.getUser);

router.put('/:id',auth, roleCheck(['admin']), userCtrl.updateUser);

router.delete('/:id',auth, roleCheck(['admin']), userCtrl.deleteUser);



module.exports = router;