const { Router } = require("express");

const usersRouter = require("./users-routes");
const dishsRouter = require("./dishs-routes");
const sessionRouter = require("./sessions-routes");
const favoritesRouter = require("./favorites-routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/dishs", dishsRouter);
routes.use("/sessions", sessionRouter);

routes.use("/favorites", favoritesRouter);

module.exports = routes;