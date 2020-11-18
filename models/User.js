const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  placesStatus: {
    type: Object,
    default: {}
  },
  refreshToken: {
    type: String
  }
});

module.exports = model('users', userSchema);
