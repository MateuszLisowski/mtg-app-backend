const mongoose = require('mongoose');
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
    required: true
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
    type: Number,
    required: true
  },
  defense: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', cardSchema);
