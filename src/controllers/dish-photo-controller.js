const knex = require("../database/knex");
const DiskStorage = require("../providers/disk-storage");

class DishPhotoController {
  async update(request, response) {
    const dish_id = request.params.id;
    const photoFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishs").where({ id: dish_id }).first();

    if(dish.photo) {
      await diskStorage.deleteFile(dish.photo);
    }

    const filename = await diskStorage.saveFile(photoFilename);
    dish.photo = filename;

    await knex("dishs").update(dish).where({ id: dish_id });

    return response.json(dish);
  }
}

module.exports = DishPhotoController;