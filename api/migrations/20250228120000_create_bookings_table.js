exports.up = function (knex) {
  return knex.schema.createTable("bookings", (table) => {
    table.increments("booking_id").primary();
    table.integer("user_id").unsigned().references("users.user_id").onDelete("CASCADE");
    table.integer("hotel_id").unsigned().references("hotels.hotel_id").onDelete("CASCADE");
    table.integer("room_id").unsigned().nullable().references("rooms.room_id").onDelete("CASCADE");
    table.integer("short_let_id").unsigned().nullable().references("short_lets.short_let_id").onDelete("CASCADE");
    table.enu("booking_type", ["room", "short_let"]).notNullable();
    table.date("check_in_date").notNullable();
    table.date("check_out_date").notNullable();
    table.string("status").defaultTo("pending");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};