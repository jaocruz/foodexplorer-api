const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");

class OrdersController {

  async create(request, response) {
    const { description } = request.body;
    const user_id = request.user.id;

    const dishDetails = description.map(dish => `${dish.quantity} x ${dish.name}`).join(", ");

    const [orderId] = await knex("orders").insert({
      status: "Pendente",
      details: dishDetails,
      user_id
    }).returning("id");

    return response.json(orderId);
  };

  async update(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const order = await knex("orders")
    .where({ id })
    .update({ status });

    return response.json();
  };

  async index(request, response) {
    const user_id = request.user.id;

    let orders= await knex("orders")
    .where("orders.user_id", user_id);

    return response.json(orders);
  };

  async show(request, response) {
    const { id } = request.params;

    const order = await knex("orders").where({ id }).first();

    return response.json({ order });
  }
}

module.exports = OrdersController;