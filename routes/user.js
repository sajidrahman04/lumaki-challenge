var express = require("express");
var router = express.Router();

// Require controller modules.
var users = require("../controllers/userApi");

/// USER ROUTES ///

// POST create user
router.post("/register", users.register);

// POST login user
router.post("/login", users.login);



module.exports = router;
