/**
 * @module userController
 * @description Controller for handling user authentication and CRUD operations.
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db, generateUserReference } = require("../database/db");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing `user_id` and `role`.
 * @returns {string} JWT token.
 */
const generateToken = (user) => {
    return jwt.sign(
        { user_id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

/**
 * Registers a new user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        console.log(req.body);

        if (!full_name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userReference = generateUserReference();

        const [user] = await db('users')
            .insert({
                full_name,
                email,
                password: hashedPassword,
                user_reference: userReference,
                role,
            })
            .returning(['user_id', 'full_name', 'email', 'user_reference', 'role']);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user', details: error.message });
    }
};

/**
 * Logs in a user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db("users").where({ email }).first();
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in", details: error.message });
    }
};

/**
 * Retrieves a user by ID (Admin Only).
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db("users").where({ user_id: id }).first();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user", details: error.message });
    }
};

/**
 * Updates a user (Only Admin or the user himself).
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        if (req.user.role !== "admin" && req.user.user_id != id) {
            return res.status(403).json({ error: "Unauthorized to update this user" });
        }

        const updatedUser = await db("users")
            .where({ user_id: id })
            .update({ username, email, role })
            .returning("*");

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating user", details: error.message });
    }
};

/**
 * Deletes a user (Admin Only).
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await db("users").where({ user_id: id }).del();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user", details: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserById, updateUser, deleteUser };  
