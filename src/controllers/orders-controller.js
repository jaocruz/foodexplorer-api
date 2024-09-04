const knex = require("../database/knex");

class OrdersController {

  async create(request, response) {
    const { description } = request.body;
    const user_id = request.user.id;

    const dishDetails = description.map(dish => `${dish.quantity} x ${dish.name}`).join(", ");

    const [orderId] = await knex("orders").insert({
      status: "preparando",
      details: dishDetails,
      user_id
    }).returning("id");

    return response.json(orderId);
  };
}

module.exports = OrdersController;