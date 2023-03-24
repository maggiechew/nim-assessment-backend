const { Router } = require("express");
const menuController = require("../controllers/menuController");

const menuRouter = Router();

menuRouter.get("/search", menuController.search);
menuRouter.get("/:id", menuController.getOne);
menuRouter.put("/:id", menuController.updateItem);
menuRouter.delete("/:id", menuController.deleteItem);
menuRouter.post("/", menuController.create);
menuRouter.get("/", menuController.getAll);

module.exports = menuRouter;
