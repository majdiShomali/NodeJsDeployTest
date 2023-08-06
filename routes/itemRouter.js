const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const upload = require("../middleware/handleImage")

router.post("/api/items",upload.single("image"), itemController.addItem);
router.get("/api/allItems", itemController.allItems);
module.exports = router;