const Router = require("express");

const DishsController = require("../controllers/dishs-controller");

const dishsRoutes = Router();

const dishsController = new DishsController();

dishsRoutes.post("/", dishsController.create);
dishsRoutes.get("/:id", dishsController.show);
dishsRoutes.delete("/:id", dishsController.delete);

module.exports = dishsRoutes;