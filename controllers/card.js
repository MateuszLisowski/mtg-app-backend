const Card = require("../models/card");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postCard = async (req, res) => {
  const card = new Card({
    name: req.body.name,
    types: req.body.types,
    keywords: req.body.keywords,
    text: req.body.text,
    tournamentLegal: req.body.tournamentLegal,
    attack: req.body.attack,
    defense: req.body.defense
  });
  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


