const { Router } = require("express");

const FavoritesController = require("../controllers/favorite-controller");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const favoriteRoutes = Router();

const favoritesController = new FavoritesController();

favoriteRoutes.use(ensureAuthenticated);

favoriteRoutes.post("/", favoritesController.create);

module.exports = favoriteRoutes;