exports.up = function (knex) {
    return knex.schema.createTable("hotels", (table) => {
        table.increments("hotel_id").primary();
        table.integer("owner_id").unsigned().references("users.user_id").onDelete("CASCADE");
        table.string("name", 255).notNullable();
        table.text("location").notNullable();
        table.text("description");
        table.float("rating").defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("hotels");
};
