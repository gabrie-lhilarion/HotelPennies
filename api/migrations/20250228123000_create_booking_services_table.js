exports.up = function (knex) {
  return knex.schema.createTable("booking_services", (table) => {
    table.increments("id").primary();
    table.integer("booking_id").unsigned().references("bookings.booking_id").onDelete("CASCADE");
    table.integer("service_id").unsigned().references("services.service_id").onDelete("CASCADE");
    table.integer("quantity").defaultTo(1);
    table.float("total_price").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("booking_services");
};
