const express = require("express");
router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
