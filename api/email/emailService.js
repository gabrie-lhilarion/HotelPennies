const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Create a transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Function to send password reset email
async function sendPasswordResetEmail(email, resetToken) {
    try {
        const resetLink = `https://yourdomain.com/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: '"HotelPennies Support" <no-reply@yourdomain.com>',
            to: email,
            subject: "Password Reset Request",
            html: `
                <p>Hello,</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Best, <br> HotelPennies Team</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
}

module.exports = { sendPasswordResetEmail };
