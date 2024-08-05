const Router = require("express");

const DishsController = require("../controllers/dishs-controller");

const dishsRoutes = Router();

const dishsController = new DishsController();

dishsRoutes.get("/", dishsController.index);
dishsRoutes.get("/:id", dishsController.show);
dishsRoutes.post("/", dishsController.create);
dishsRoutes.put("/:id", dishsController.update);
dishsRoutes.delete("/:id", dishsController.delete);

module.exports = dishsRoutes;