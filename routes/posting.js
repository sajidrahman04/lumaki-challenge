var express = require("express");
var router = express.Router();
var { vendorAuth } = require("./../middleware/WebTokenAuth");


var posting = require("../controllers/postingApi");

router.post("/", vendorAuth, posting.create);

router.get("/", posting.get);


module.exports = router;
