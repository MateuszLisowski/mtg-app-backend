const Card = require("../models/card");

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findOne({ name: req.body.name });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postCard = async (req, res) => {
  const {
    name,
    types,
    keywords,
    text,
    tournamentLegal,
    attack,
    defense
  } = req.body;

  try {
    const isCardInDatabase = await Card.findOne({ name });
    if (isCardInDatabase) {
      res.status(400).json({
        message: `Card with ${name} name is currently in database`,
        status: 400
      });
    }

    const card = new Card({
      name,
      types,
      keywords,
      text,
      tournamentLegal,
      attack,
      defense
    });
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};
