const express = require("express");
const { signUp, SignIn } = require("../controllers/authController");

const router = express.Router()

router.post("/signup",signUp)
router.post("/signin",SignIn)

module.exports = router