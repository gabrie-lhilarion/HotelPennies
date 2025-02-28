exports.up = function (knex) {
    return knex.schema.createTable("room_images", (table) => {
        table.increments("image_id").primary();
        table.integer("room_id").unsigned().references("rooms.room_id").onDelete("CASCADE");
        table.string("image_url").notNullable();
        table.timestamp("uploaded_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("room_images");
};
