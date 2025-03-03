/**
 * @module db
 * @description
 * This module initializes and configures the PostgreSQL database connection using Knex.js.
 * It also ensures that necessary tables are created if they do not exist, avoiding the need for manual migrations.
 *
 * Features:
 * - Establishes a connection with PostgreSQL.
 * - Automatically checks for missing tables and creates them.
 * - Ensures data integrity with foreign key constraints.
 *
 * Tables Created:
 * - `users`: Stores user information (admin, hotel owners, guests, and affiliate marketers).
 * - `hotels`: Stores hotel information associated with hotel owners.
 * - `rooms`: Stores details of rooms in hotels.
 * - `bookings`: Tracks room and short-let bookings.
 * - `services`: Stores extra services offered to customers.
 */

const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Knex instance
const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
});

/**
 * @function setupDatabase
 * @description Ensures all necessary tables exist in the database. If a table is missing, it is created.
 */
async function setupDatabase() {
    try {
        console.log('🔄 Checking database setup...');

        // Create users table
        const hasUsersTable = await db.schema.hasTable('users');
        if (!hasUsersTable) {
            await db.schema.createTable('users', (table) => {
                table.uuid('user_id').primary().defaultTo(db.raw('gen_random_uuid()'));
                table.string('full_name').notNullable();
                table.string('email').unique().notNullable();
                table.string('password').notNullable();
                table.string('role').defaultTo('guest'); // 'admin', 'hotel_owner', 'affiliate_marketer'
                table.timestamps(true, true);
            });
            console.log('✅ Created users table.');
        }

        // Create hotels table
        const hasHotelsTable = await db.schema.hasTable('hotels');
        if (!hasHotelsTable) {
            await db.schema.createTable('hotels', (table) => {
                table.uuid('hotel_id').primary().defaultTo(db.raw('gen_random_uuid()'));
                table.uuid('owner_id').references('users.user_id').onDelete('CASCADE');
                table.string('hotel_name').notNullable();
                table.text('description');
                table.string('location').notNullable();
                table.integer('rating').defaultTo(0);
                table.timestamps(true, true);
            });
            console.log('✅ Created hotels table.');
        }

        // Create rooms table
        const hasRoomsTable = await db.schema.hasTable('rooms');
        if (!hasRoomsTable) {
            await db.schema.createTable('rooms', (table) => {
                table.uuid('room_id').primary().defaultTo(db.raw('gen_random_uuid()'));
                table.uuid('hotel_id').references('hotels.hotel_id').onDelete('CASCADE');
                table.string('room_type').notNullable();
                table.decimal('price', 10, 2).notNullable();
                table.integer('capacity').notNullable();
                table.boolean('is_available').defaultTo(true);
                table.timestamps(true, true);
            });
            console.log('✅ Created rooms table.');
        }

        // Create bookings table
        const hasBookingsTable = await db.schema.hasTable('bookings');
        if (!hasBookingsTable) {
            await db.schema.createTable('bookings', (table) => {
                table.uuid('booking_id').primary().defaultTo(db.raw('gen_random_uuid()'));
                table.uuid('user_id').references('users.user_id').onDelete('CASCADE');
                table.uuid('room_id').references('rooms.room_id').onDelete('CASCADE');
                table.enu('booking_type', ['room', 'short_let']).notNullable();
                table.timestamp('check_in_date').notNullable();
                table.timestamp('check_out_date').notNullable();
                table.decimal('total_price', 10, 2).notNullable();
                table.timestamps(true, true);
            });
            console.log('✅ Created bookings table.');
        }

        // Create services table
        const hasServicesTable = await db.schema.hasTable('services');
        if (!hasServicesTable) {
            await db.schema.createTable('services', (table) => {
                table.uuid('service_id').primary().defaultTo(db.raw('gen_random_uuid()'));
                table.string('service_name').notNullable();
                table.decimal('price', 10, 2).notNullable();
                table.timestamps(true, true);
            });
            console.log('✅ Created services table.');
        }

        console.log('🚀 Database setup complete!');

    } catch (error) {
        console.error('❌ Error setting up database:', error);
    }
}

// Run setup when this file is loaded
setupDatabase();

module.exports = db;
