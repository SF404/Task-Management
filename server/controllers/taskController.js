const Task = require('../models/Task');
const Space = require('../models/Space');

const taskController = {
    createTaskInSpace: async (req, res) => {
        const { title, description, deadline } = req.body;
        const spaceId = req.params.spaceId;
        const userId = req.user.id;
        console.log(spaceId)

        try {
            const space = await Space.findById(spaceId);
            if (!space) {
                return res.status(404).json({ message: 'Space not found' });
            }

            const newTask = await Task.create({ title, description, deadline, space: spaceId, user: userId });
            res.json({ message: 'Task created successfully', task: newTask });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllTasksInSpace: async (req, res) => {
        const spaceId = req.params.spaceId;

        try {
            const tasksInSpace = await Task.find({ space: spaceId });
            res.json(tasksInSpace);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    markTaskAsDone: async (req, res) => {
        const taskId = req.params.taskId;
        console.log(req.user)
        const userId = req.user.id;
        console.log(taskId, userId)

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            if (task.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            task.status = !task.status;
            await task.save();

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateTaskInSpace: async (req, res) => {
        const taskId = req.params.taskId;
        const { title, description, deadline } = req.body;
        const userId = req.user.id;

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            if (task.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            const updatedTask = await Task.findByIdAndUpdate(
                taskId,
                { title, description, deadline },
                { new: true }
            );
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteTaskInSpace: async (req, res) => {
        const taskId = req.params.taskId;
        const userId = req.user.id;

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            if (task.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            const deletedTask = await Task.findByIdAndDelete(taskId);
            console.log(deletedTask)
            res.json(deletedTask);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = taskController;
