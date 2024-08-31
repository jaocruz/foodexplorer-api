const Router = require("express");

const FavoritesController = require("../controllers/favorites-controller");

const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.get("/", favoritesController.index);

module.exports = favoritesRoutes;