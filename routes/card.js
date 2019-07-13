const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.js");

router.get("/getAll", cardController.getCards);
router.post("/add", cardController.postCard);

module.exports = router;
