const knex = require("../database/knex");
const appError = require("../utils/app-error");
const sqliteConnection = require("../database/sqlite");
const DiskStorage = require("../providers/disk-storage");

class DishsController {
  async create (request, response) {
    const {name, category, price, description, ingredients} = request.body;
    const photo = request.file;

    try{
      const diskStorage = new DiskStorage();
      let filename = null;

      if(photo) {
        filename = await diskStorage.saveFile(photo.filename);
      }

      const [dish_id] = await knex("dishs").insert({
        name, category, price, description, photo: filename });

      const parsedIngredients = JSON.parse(ingredients);

      const ingredientsInsert = parsedIngredients.map(name => {
        return {
          dish_id,
          name
        }
      });

      await knex("ingredients").insert(ingredientsInsert);

      return response.json({ id: dish_id, photo: filename });
    }

    catch(error) {
      console.error("Erro ao criar prato:", error);
      return response.status(500).json({error: "Internal Server Error"})
    }
  };

  async update (request, response) {
    const {name, category, price, description, ingredients} = request.body;
    const photo = request.file;

    const { id } = request.params;

    const database = await sqliteConnection();
    const dish = await database.get("SELECT * FROM dishs WHERE id = (?)", [id]);

    if (!dish) {
      throw new appError("Prato não encontrado.")
    };

    let filename = dish.photo;
    
    if(photo) {
      const diskStorage = new DiskStorage();
      filename = await diskStorage.saveFile(photo.filename);
    }

    await database.run(`UPDATE dishs SET
      name = ?, photo = ?, category = ?, price = ?, description = ? WHERE id = ?`,
      [name, filename, category, price, description, id]
    );

    await database.run("DELETE FROM ingredients WHERE dish_id = ?", [id]);

    if(ingredients) {
      try {
        const parsedIngredients = JSON.parse(ingredients);

        if(!Array.isArray(parsedIngredients)) {
          throw new appError("Ingredientes devem ser passados em um array.")
        }

        const ingredientsInsert = parsedIngredients.map(ingredient => ({
          dish_id: id,
          name: ingredient
        }));

        await knex("ingredients").insert(ingredientsInsert);
      }

    catch(error) {
      return response.status(400).json({error: "Formato inválido"})
    }
  }

    return response.json();
  };

  async delete (request, response) {
    const { id } = request.params;

    await knex("dishs").where({ id }).delete();

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

  async index (request, response) {
    const { name, ingredients } = request.query;

    let dishs = knex("dishs")

    if(ingredients) {
      const filterIngredients = ingredients
      .split(",").map(ingredient = ingredient.trim());

      dishs = dishs
      .innerJoin("ingredients", "dish.id", "ingredients.dish_id")
      .whereIn("ingredients.name", filterIngredients)
      .groupBy("dishs.id", "dishs.name", "dishs.category")
    }

    if(name) {
      dishs = dishs.whereLike("dish.name", `%${name}%`);
    }

    const dish = await dishs.orderBy("dishs.category");

    const ingredientList = await knex("ingredients");

    const dishWithIngredients = dish.map(dish => {
      const dishIngredients = ingredientList.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishIngredients
      }
    });

    return response.json(dishWithIngredients);

  };
}

module.exports = DishsController;