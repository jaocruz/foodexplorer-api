const Router = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishsController = require("../controllers/dishs-controller");
const DishsPhotoController = require("../controllers/dish-photo-controller");

const dishsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishsController = new DishsController();
const dishPhotoController = new DishsPhotoController();

dishsRoutes.get("/", dishsController.index);
dishsRoutes.get("/:id", dishsController.show);
dishsRoutes.post("/", upload.single("photo"), dishsController.create);
dishsRoutes.put("/:id", dishsController.update);
dishsRoutes.delete("/:id", dishsController.delete);

dishsRoutes.patch("/:id/photo", upload.single("photo"), dishPhotoController.update);

module.exports = dishsRoutes;