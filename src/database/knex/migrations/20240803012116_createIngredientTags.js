exports.up = knex => knex.schema.createTable("ingredientTags", table => {
  table.increments("id");
  table.text("name");
  table.integer("dish_id").references("id").inTable("dishs").onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("ingredientTags");
