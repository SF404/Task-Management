const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:spaceId/create', authMiddleware, taskController.createTaskInSpace);
router.put('/:taskId', authMiddleware, taskController.updateTaskInSpace);
router.put('/:taskId/mark-as-done', authMiddleware, taskController.markTaskAsDone);
router.delete('/:taskId', authMiddleware, taskController.deleteTaskInSpace);
router.get('/:spaceId/all', authMiddleware, taskController.getAllTasksInSpace);

module.exports = router;
