exports.up = function (knex) {
    return knex.schema.createTable("bookings", (table) => {
        table.increments("booking_id").primary();
        table.integer("user_id").unsigned().references("users.user_id").onDelete("CASCADE");
        table.integer("room_id").unsigned().references("rooms.room_id").onDelete("CASCADE");
        table.date("check_in_date").notNullable();
        table.date("check_out_date").notNullable();
        table.float("total_price").notNullable();
        table.enu("status", ["pending", "confirmed", "cancelled"]).defaultTo("pending");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("bookings");
};
