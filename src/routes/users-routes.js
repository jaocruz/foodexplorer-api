const { Router } = require("express");

const UsersController = require("../controllers/users-controller");
const ensureAuthenticated = require("../middlewares/ensure-authenticated");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;