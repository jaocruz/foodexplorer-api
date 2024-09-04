exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id");
  table.integer("status");
  table.integer("details");
  table.timestamp("created_at").default(knex.fn.now());
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("orders");
