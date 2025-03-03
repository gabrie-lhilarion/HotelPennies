/**
 * Migration Routes
 * Defines a route to run migrations one by one.
 */

const express = require('express');
const router = express.Router();
const { runMigration } = require('../controllers/migrationController');

// Route to run a specific migration
router.get('/migrate/:migrationName', runMigration);

module.exports = router;
