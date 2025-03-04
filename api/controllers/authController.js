const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../config/db'); // Import Knex instance
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Registers a new user.
 * @param {Object} req - Request object containing user details.
 * @param {Object} res - Response object.
 */
const register = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into DB
        const [newUser] = await knex('users')
            .insert({ full_name, email, password: hashedPassword, role })
            .returning(['user_id', 'full_name', 'email', 'role']);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Logs in a user and returns a JWT token.
 * @param {Object} req - Request object containing email and password.
 * @param {Object} res - Response object.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await knex('users').where({ email }).first();
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token (30-day expiration)
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            SECRET_KEY,
            { expiresIn: '30d' } // ✅ Updated to 30 days
        );

        res.json({
            token,
            user: { user_id: user.user_id, full_name: user.full_name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Gets the current user's details.
 * @param {Object} req - Request object with authenticated user data.
 * @param {Object} res - Response object.
 */
const getUser = async (req, res) => {
    try {
        const user = await knex('users').where({ user_id: req.user.user_id }).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user_id: user.user_id, full_name: user.full_name, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export functions for use in routes
module.exports = { register, login, getUser };
