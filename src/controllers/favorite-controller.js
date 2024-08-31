const knex = require("../database/knex");

class favoritesController {

  async create(request, response){
    const { dish_id } = request.query;
    const user_id = request.user.id;

    await knex("favorites").insert({ dish_id, user_id });

    return response.json();
  };
}

module.exports = favoritesController;