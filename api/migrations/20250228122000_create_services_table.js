exports.up = function (knex) {
  return knex.schema.createTable("services", (table) => {
    table.increments("service_id").primary();
    table.string("service_name").notNullable();
    table.float("price").notNullable();
    table.text("description").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
