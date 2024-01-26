const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
