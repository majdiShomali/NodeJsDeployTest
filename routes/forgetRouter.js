const express = require("express");
const router = express.Router();
const userController = require("../controllers/forgetController");

router.post("/api/ForgetUsers" , userController.allForgetUsers);
router.post("/api/check-pin" , userController.checkPin);
router.post("/api/reset-password" , userController.resetPassword);



module.exports = router;