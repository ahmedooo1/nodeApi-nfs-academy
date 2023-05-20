const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/comments', auth, commentController.createComment);
router.get('/comments', commentController.getComments);
router.get('/comments/:id', auth, commentController.getComment);
router.put('/comments/:id', auth, roleCheck('admin'), commentController.updateComment);
router.delete('/comments/:id', auth, roleCheck('admin'), commentController.deleteComment);

module.exports = router;