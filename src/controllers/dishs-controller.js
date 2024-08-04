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
  }
}

module.exports = DishsController;