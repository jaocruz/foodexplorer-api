const { Router } = require("express");

const OrdersController = require("../controllers/orders-controller");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const orderRoutes = Router();

const ordersController = new OrdersController();

orderRoutes.use(ensureAuthenticated);

orderRoutes.post("/", ordersController.create);
orderRoutes.get("/", ordersController.index);

module.exports = orderRoutes;