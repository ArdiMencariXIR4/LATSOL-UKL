// route/user.routes.js
const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");
const { midOne } = require("../middleware/ez-middleware");
const { validateUser } = require("../middleware/valid");

// Protect routes with JWT (you can add later)
router.post("/", validateUser, userCtrl.addUser);
router.put("/:id", validateUser, userCtrl.updateUser);
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);

module.exports = router;