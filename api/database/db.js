/**
 * Database connection setup using Knex.
 * This file initializes the Knex instance and exports it for use in other parts of the app.
 */

const knex = require('knex');
const knexConfig = require('../../knexfile'); // Adjust the path if needed

// Determine the environment (default to 'development' if not specified)
const environment = process.env.NODE_ENV || 'development';

// Initialize the Knex instance using the appropriate environment configuration
const db = knex(knexConfig[environment]);

module.exports = db;
