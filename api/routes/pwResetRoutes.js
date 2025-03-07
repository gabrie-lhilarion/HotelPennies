const express = require('express');
const { db } = require('../database/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating a secure token
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();
console.log("Email User:", process.env.SMTP_USER);
console.log("Email Pass:", process.env.SMTP_PASS);
// Nodemailer setup
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Brevo's SMTP server
    port: 587, // Recommended port for TLS
    secure: false, // Use `false` for STARTTLS
    auth: {
        user: process.env.SMTP_USER, // Brevo SMTP login (e.g., 8729e3001@smtp-brevo.com)
        pass: process.env.SMTP_PASS  // Your Brevo SMTP password
    }
});

// Request password reset
router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Checking user')
        // Check if user exists
        const user = await db('users').where({ email }).first();
        if (!user) {
            console.log('No user found')
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found')
        // Generate a reset token
        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // Token expires in 1 hour

        console.log({ email, from: process.env.EMAIL_USER })
        // Save token to database
        await db('users').where({ email }).update({
            reset_token: token,
            reset_token_expires: tokenExpiry,
        });

        // Send reset email
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
        });

        res.json({ message: 'Password reset link sent to email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Reset password
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find user by token
        const user = await db('users')
            .where('reset_token', token)
            .where('reset_token_expires', '>', new Date()) // Check if token is still valid
            .first();

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear token
        await db('users').where({ user_id: user.user_id }).update({
            password: hashedPassword,
            reset_token: null,
            reset_token_expires: null,
        });

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Find user by token
        const user = await db('users')
            .where('reset_token', token)
            .where('reset_token_expires', '>', new Date()) // Check if token is still valid
            .first();

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // If token is valid, allow frontend to show reset form
        res.json({ message: 'Valid token', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
