const Space = require('../models/Space');
const Task = require('../models/Task');

const spaceController = {
    createSpace: async (req, res) => {
        const { name } = req.body;
        const userId = req.user.id;
        console.log(userId)
        try {
            const newSpace = await Space.create({ name, createdBy: userId });
            res.json({ message: 'Space created successfully', space: newSpace });
        } catch (error) {
            console.error('Error creating space:', error.message);
            res.status(500).json({ message: 'Error creating space', error: error.message });
        }
    },

    deleteSpace: async (req, res) => {
        const spaceId = req.params.spaceId;
        const userId = req.user.id;

        try {
            const space = await Space.findById(spaceId);
            if (!space) {
                return res.status(404).json({ message: 'Space not found' });
            }

            if (space.createdBy.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            const deletedSpace = await Space.findByIdAndDelete(spaceId);
            await Task.deleteMany({ space: spaceId });

            res.json(deletedSpace);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateSpace: async (req, res) => {
        const spaceId = req.params.spaceId;
        const { name } = req.body;
        const userId = req.user.id;

        try {
            const space = await Space.findById(spaceId);
            if (!space) {
                return res.status(404).json({ message: 'Space not found' });
            }

            if (space.createdBy.toString() !== userId.toString()) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            const updatedSpace = await Space.findByIdAndUpdate(
                spaceId,
                { name },
                { new: true }
            );
            res.json(updatedSpace);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllSpacesForUser: async (req, res) => {
        const userId = req.user.id;

        try {
            const spaces = await Space.find({ createdBy: userId });
            res.json(spaces);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = spaceController;
