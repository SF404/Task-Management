const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, spaceController.createSpace);
router.put('/:spaceId', authMiddleware, spaceController.updateSpace);
router.delete('/:spaceId', authMiddleware, spaceController.deleteSpace);
router.get('/all', authMiddleware, spaceController.getAllSpacesForUser);

module.exports = router;
