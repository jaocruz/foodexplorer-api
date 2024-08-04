const knex = require("../database/knex");
const appError = require("../utils/app-error");
const sqliteConnection = require("../database/sqlite");

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

  async update (request, response) {
    const {name, category, price, description, ingredients} = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const dish = await database.get("SELECT * FROM dishs WHERE id = (?)", [id]);

    if (!dish) {
      throw new appError("Prato não encontrado.")
    };

    dish.name = name;
    dish.category = category;
    dish.price = price;
    dish.description = description;

    await database.run(`UPDATE dishs SET
      name = ?, category = ?, price = ?, description = ? WHERE id = ?`,
      [dish.name, dish.category, dish.price, dish.description, id]
    );

    await database.run("DELETE FROM ingredients WHERE dish_id = ?", [id]);

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id: id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
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
  };
}

module.exports = DishsController;