exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("name", 100).notNullable();
        table.string("email", 100).unique().notNullable();
        table.string("password_hash").notNullable();
        table
            .enu("role", ["admin", "affiliate", "guest", "hotel_owner"])
            .notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};
