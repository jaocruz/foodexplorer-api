const knex = require("../database/knex");

class favoritesController {

  async create(request, response){
    const { dish_id } = request.query;
    const user_id = request.user.id;

    await knex("favorites").insert({ dish_id, user_id });

    return response.json();
  };

  async delete(request, response){
    const { id } = request.params;

    await knex("favorites").where({ id }).delete();

    return response.json();
  };

  async index(request, response){
    const user_id = request.user.id;

    let dishs = await knex("favorites")
    .select(["favorites.id", "favorites.dish_id", "dishs.name", "dishs.photo"])
    .where("favorites.user_id", user_id)
    .innerJoin("dishs", "dishs.id", "favorites.dish_id")

    return response.json(dishs);
  }
}

module.exports = favoritesController;