const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const secret = process.env.SECRET

const userController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ user: { id: user._id } }, secret, {
                expiresIn: '1h',
            });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    signup: async (req, res) => {
        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ email, password: hashedPassword });
            const response = await newUser.save();
            console.log("----------------", response)

            res.json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = userController;
