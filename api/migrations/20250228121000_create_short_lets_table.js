exports.up = function (knex) {
  return knex.schema.createTable("short_lets", (table) => {
    table.increments("short_let_id").primary();
    table.integer("hotel_id").unsigned().references("hotels.hotel_id").onDelete("CASCADE");
    table.string("apartment_type").notNullable();
    table.float("price_per_night").notNullable();
    table.integer("capacity").notNullable();
    table.enu("status", ["available", "booked", "maintenance"]).defaultTo("available");
    table.text("description");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("short_lets");
};