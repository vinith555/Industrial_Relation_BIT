const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");

router.post("/user/register",user.register);
router.post("/user/login",user.login);

module.exports = router;