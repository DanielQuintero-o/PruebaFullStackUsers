const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAllUsers)
  .get("/:userId", userController.getOneUser)
  .post("/", userController.createNewUser)
  .put("/:userId", userController.updateOneUser)
  .delete("/:userId", userController.deleteOneUser);

module.exports = router;