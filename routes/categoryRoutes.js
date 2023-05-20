const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');



router.post('/categories', categoryController.createCategory);
router.post('/subcategories', categoryController.createSubCategory);
router.get('/categories', categoryController.getCategories);
router.get('/subcategories', categoryController.getSubCategories);
module.exports = router;