const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.js");

router.get("/getCard/:cardName", cardController.getCard);
router.post("/add", cardController.postCard);
router.patch("/update", cardController.updateCard);

module.exports = router;
