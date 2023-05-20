const express = require('express');
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/Stuff');
const multer = require('../middleware/multer-config');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();


router.post('/', auth, roleCheck(['admin', 'redacteur']), multer, stuffCtrl.createThing);

/**    
 * @swagger  
 * /api/stuff/{id}:
 *   get:
 *     summary: Récupère une chose par son ID
 *     description: Route qui retourne une chose pour un ID spécifique
 *     parameters:
 *       - in: path
 *         name: id 
 *         required: true
 *         schema: 
 *           type: string
 *     responses:
 *       200:
 *         description: Une chose avec l'ID spécifié
 */
router.get('/:id', auth,stuffCtrl.getOneThing);
router.put('/:id',auth,roleCheck(['admin']), multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);


/**
 * @swagger
 * /api/stuff:
 *   get:
 *     summary: Récupère la liste des choses
 *     description: Route qui retourne la liste de toutes les choses
 *     responses:
 *       200:
 *         description: Une liste de choses
 */
router.get('/', stuffCtrl.getThings);

  module.exports= router;


  