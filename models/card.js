const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  types: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
  },
  text: {
    type: String,
    required: true
  },
  tournamentLegal: {
    type: Boolean,
    required: true
  },
  attack: {
    type: Number
  },
  defense: {
    type: Number
  }
});

module.exports = mongoose.model("User", cardSchema);
