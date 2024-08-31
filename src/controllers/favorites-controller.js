const knex = require("knex");

class FavoritesController {  
  async index(request, response) {
    const {userId} = request.params;

    try {
      const favorites = knex("favorites").where({ user_id: userId });
      return response.json(favorites);
    }

    catch(error) {
      return response.status(500).json(error)
    }
  };
}

module.exports = FavoritesController;
