const Card = require("../models/card");

exports.getCard = async (req, res) => {
  try {
    const card = await Card.findOne({ name: req.params.cardName });

    if (!card) {
      res.status(400).json({
        message: `Card ${req.params.cardName} not found`,
        status: 400
      });
    } else {
      res.status(200).json({
        card,
        status: 200,
        message: `Card ${req.params.cardName} found in database`
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCards = async (req, res) => {
  try {
    const searchCriterias = Object.entries(JSON.parse(req.params.cardInfo))
      .filter(val => (val[0] === "tournamentLegal" ? true : Boolean(val[1])))
      .reduce((obj, item) => {
        obj[item[0]] = item[1];
        return obj;
      }, {});

      console.log(searchCriterias)

    const cards = await Card.find({
      ...searchCriterias
    });

    console.log(cards)

    if (!cards.length) {
      res.status(400).json({
        message: `Card with this criteria not found`,
        status: 400
      });
    } else {
      res.status(200).json({
        cards,
        status: 200,
        message: `Cards found in database`
      });
    }
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

exports.updateCard = async (req, res) => {
  try {
    const {
      foundCardId,
      name,
      types,
      keywords,
      text,
      tournamentLegal,
      attack,
      defense
    } = req.body;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: foundCardId },
      { name, types, keywords, text, tournamentLegal, attack, defense }
    );

    if (!updatedCard) {
      res.status(400).json({
        message: "Something went wrong during card updating. Please try again",
        status: 400
      });
    }

    res.status(200).json({
      updatedCard,
      status: 200,
      message: `Card ${name} info updated`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
