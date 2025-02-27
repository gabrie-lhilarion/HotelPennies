exports.up = function (knex) {
    return knex.schema.createTable("rooms", (table) => {
        table.increments("room_id").primary();
        table.integer("hotel_id").unsigned().references("hotels.hotel_id").onDelete("CASCADE");
        table.string("room_type").notNullable();
        table.float("price_per_night").notNullable();
        table.integer("capacity").defaultTo(1); // Number of guests allowed
        table.enu("status", ["available", "booked", "maintenance"]).defaultTo("available");
        table.text("description");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("rooms");
};

