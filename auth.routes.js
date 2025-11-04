// route/auth.routes.js
const express = require("express");
const router = express.Router();
const { authenticate } = require("../controller/auth.controller");

router.post("/login", authenticate);

module.exports = router;