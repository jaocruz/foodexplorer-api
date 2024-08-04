const Router = require("express");

const DishsController = require("../controllers/dishs-controller");

const dishsRoutes = Router();

const dishsController = new DishsController();

dishsRoutes.post("/", dishsController.create);
dishsRoutes.get("/:id", dishsController.show);

module.exports = dishsRoutes;