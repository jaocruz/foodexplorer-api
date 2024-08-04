const { Router } = require("express");

const usersRouter = require("./users-routes");
const dishsRoutes = require("./dishs-routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/dishs", dishsRoutes);

module.exports = routes;