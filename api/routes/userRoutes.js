/**
 * @module userRoutes
 * @description Routes for user authentication and management.
 */

const express = require("express");
const {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController.js");

const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Public Routes (No Authentication Required)
router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login

// Protected Routes (Authentication Required)
router.get("/:id", authenticateUser, authorizeRoles("admin"), getUserById); // Get user by ID (Admin Only)
router.put("/:id", authenticateUser, updateUser); // Update user details (Authenticated User)
router.delete("/:id", authenticateUser, authorizeRoles("admin"), deleteUser); // Delete user (Admin Only)

module.exports = router; // Corrected: Using CommonJS syntax
