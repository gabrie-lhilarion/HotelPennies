exports.up = function (knex) {
    return knex.schema.createTable("referrals", (table) => {
        table.increments("referral_id").primary();
        table.integer("affiliate_id").unsigned().references("users.user_id").onDelete("CASCADE");
        table.integer("guest_id").unsigned().references("users.user_id").onDelete("CASCADE");
        table.string("referral_code").notNullable().unique();
        table.float("commission").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("referrals");
};
