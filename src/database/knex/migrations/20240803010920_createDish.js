exports.up = knex => knex.schema.createTable("dishs", table => {
  table.increments("id");
  table.text("name");
  table.text("photo");
  table.text("categry");
  table.decimal("price");
  table.text("description");
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishs");