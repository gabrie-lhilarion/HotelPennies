/**
 * Migration Controller
 * This allows running migrations one by one when the API route is accessed.
 */

const knex = require('../database/db');

/**
 * Run a specific migration
 */
const runMigration = async (req, res) => {
    const { migrationName } = req.params; // Get migration name from the URL

    try {
        console.log(`Running migration: ${migrationName}`);

        // Run the migration
        await knex.migrate.up({ name: migrationName });

        return res.status(200).json({
            message: `Migration ${migrationName} ran successfully!`
        });
    } catch (error) {
        console.error(`Error running migration: ${migrationName}`, error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { runMigration };
