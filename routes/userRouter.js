const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const protected =require("../middleware/Protected")
const upload = require("../middleware/handleImage")

router.get("/api/userData" ,protected, userController.userData);
router.get("/api/users" , userController.allUsers);
router.get("/api/Providers", userController.allProviders);
router.get("/api/Admins", userController.allAdmins);
router.post("/api/users", userController.newUser);
router.post("/api/usersLogin", userController.newUserLogin);
router.get("/api/users/:id", userController.oneUser);
router.delete("/api/users/:id", userController.deleteUser);
router.put("/api/users/:id",upload.single("image"), userController.updateUser);

module.exports = router;