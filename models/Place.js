const {Schema, model} = require('mongoose');

const placeSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  linkToMenu: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: ''
  },
  countLike: {
    type: Number,
    default: 0
  },
  countDislike: {
    type: Number,
    default: 0
  }
});

module.exports = model('places', placeSchema);
