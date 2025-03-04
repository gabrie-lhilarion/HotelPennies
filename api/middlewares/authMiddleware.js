/**
 * @module authMiddleware
 * @description Middleware for authenticating users and enforcing role-based access control.
 */

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Middleware to authenticate users using JWT.
 * Extracts the token from the request headers and verifies it.
 * If valid, attaches the decoded user data to `req.user` and proceeds.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

/**
 * Middleware to enforce role-based access control.
 * Ensures that only users with the specified roles can access the route.
 *
 * @param {...string} allowedRoles - List of roles allowed to access the route.
 * @returns {Function} Middleware function.
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles }; 
