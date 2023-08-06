const express = require("express");
const router = express.Router();
const userController = require("../controllers/GoogleLogInController");

router.post("/api/newUserGoogle", userController.newUserGoogle);
module.exports = router;