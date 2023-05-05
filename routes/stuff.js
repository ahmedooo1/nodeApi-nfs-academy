const express = require('express');
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/Stuff');
const multer = require('../middleware/multer-config');

const router = express.Router();


router.post('/', auth,multer, stuffCtrl.createThing);
router.get('/:id', auth,stuffCtrl.getOneThing);
router.put('/:id', auth,multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/',auth, stuffCtrl.getThings);

  module.exports= router;


  