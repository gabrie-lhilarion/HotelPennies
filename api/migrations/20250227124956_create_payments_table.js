exports.up = function (knex) {
    return knex.schema.createTable("payments", (table) => {
        table.increments("payment_id").primary();
        table.integer("booking_id").unsigned().references("bookings.booking_id").onDelete("CASCADE");
        table.float("amount").notNullable();
        table.enu("status", ["pending", "completed", "failed"]).defaultTo("pending");
        table.string("payment_method").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("payments");
};
