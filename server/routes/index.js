const express = require("express");
const users = require("./users");
const router = express.Router();

router.get("/users", users.findAll);

module.exports = router;
