const { Router } = require("express");

const OrdersController = require("../controllers/orders-controller");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const orderRoutes = Router();

const ordersController = new OrdersController();

orderRoutes.use(ensureAuthenticated);

orderRoutes.post("/", ordersController.create);
orderRoutes.put("/:id", ordersController.update);
orderRoutes.get("/", ordersController.index);
orderRoutes.get("/", ordersController.show);

module.exports = orderRoutes;