const knex = require("../database/knex");

class OrdersController {
  async create(request, response) {
    const { description } = request.body;
    const user_id = request.user.id;

    const detailsJson = JSON.stringify(description);

    const [orderId] = await knex("orders").insert({
      status: "Preparando",
      details: detailsJson,
      user_id
    }).returning("id");

    return response.json(orderId);
  };

  async update(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    await knex("orders")
    .where({ id })
    .update({ status });

    return response.json();
  };

  async index(request, response) {
    const user_id = request.user.id;

    let orders= await knex("orders")

    return response.json(orders);
  };

  async show(request, response) {
    const { id } = request.params;
    const userId = request.user.id

    const order = await knex("orders").where({ id }).first();

    if(order.user_id !== userId) {
      return response.status(403).json({error: "Acesso não autorizado"})
    }

    return response.json({ order });
  };
}

module.exports = OrdersController;