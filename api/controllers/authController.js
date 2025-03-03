import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import knex from '../config/db.js'; // Import Knex instance
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// Register a new user
export const register = async (req, res) => {
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

// Login user and generate JWT token
export const login = async (req, res) => {
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

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, user: { user_id: user.user_id, full_name: user.full_name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get current user details
export const getUser = async (req, res) => {
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
