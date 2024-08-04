const knex = require("../database/knex");

class DishsController {
  async create (request, response) {
    const {name, category, price, description, ingredients} = request.body;

    const [dish_id] = await knex("dishs").insert({
      name, category, price, description });

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.json();
  };

  async show (request, response) {
    const { id } = request.params;

    const dish = await knex("dishs").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.json({
      ...dish, ingredients
    });
  };

  async delete (request, response) {
    const { id } = request.params;

    await knex("dishs").where({ id }).delete();

    return response.json();
  }
}

module.exports = DishsController;