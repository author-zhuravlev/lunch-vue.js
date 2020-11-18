const {Schema, model, Types} = require('mongoose');

const ratingSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  result: {
    type: [
      {
        time: String,
        rating: [
          {
            _id: Types.ObjectId,
            name: String,
            countLike: Number,
            countDislike: Number
          }
        ]
      },
    ],
    default: []
  }
});

module.exports = model('ratings', ratingSchema);
