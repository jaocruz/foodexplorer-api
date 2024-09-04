const { Router } = require("express");

const usersRouter = require("./users-routes");
const dishsRouter = require("./dishs-routes");
const sessionRouter = require("./sessions-routes");

const favoriteRouter = require("./favorites-routes");
const orderRouter = require("./orders-routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/dishs", dishsRouter);
routes.use("/sessions", sessionRouter);

routes.use("/favorites", favoriteRouter);
routes.use("/orders", orderRouter);

module.exports = routes;