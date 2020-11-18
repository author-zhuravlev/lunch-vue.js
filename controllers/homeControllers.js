const config = require('config');
const fieldValidation = require('../utils/fieldValidation');
const Place = require('../models/Place');
const Rating = require('../models/Rating');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getPlaces = async (req, res) => {
  try {
    const userId = req.user._id;
    const places = await Place.find();
    const {placesStatus} = await User.findOne({_id: userId});

    res.status(200).json({places, placesStatus});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.getRating = async (req, res) => {
  try {
    const {date} = req.body;
    const rating = await Rating.findOne({date});

    res.status(200).json(rating);
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.addVotingResult = async (req, res) => {
  try {
    const {date, result} = req.body;
    const rating = await Rating.findOneAndUpdate(
      {date},
      {$push: {result}},
      {new: true}
    );

    if (!rating) {
      await new Rating({date, result: [result]}).save();
    }

    res.status(200).json({message: 'Result was saved!'});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.searchVotingResult = async (req, res) => {
  try {
    const {date} = req.body;
    const rating = await Rating.findOne({date});

    res.status(200).json({rating: rating ? rating : {}});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.updatePlaceRating = async (req, res) => {
  try {
    const userId = req.user._id;
    const {placeId, placeRating, status} = req.body;

    //update countLike and countDislike in the Place
    const place = await Place.findOneAndUpdate(
      {_id: placeId},
      {$set: placeRating},
      {new: true}
    );

    //update placesStatus in the User
    await User.findOneAndUpdate(
      {_id: userId},
      {$set: {['placesStatus.' + placeId]: status}},
      {new: true}
    );

    place.status = status;

    res.status(200).json({place});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.deletePlace = async (req, res)  => {
  try {
    const deletedPlace = req.body;
    const userId = req.user._id;

    await Place.deleteOne({ _id: deletedPlace._id });

    await User.updateOne({_id: userId}, {$unset: {['placesStatus.' + deletedPlace._id]: 1}});

    res.status(200).json({deletedPlace, message: 'Place was deleted!'});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.addPlace = async (req, res) => {
  try {
    fieldValidation(req, res, config.get('info').createError);

    const newPlace = req.body;

    const place = await new Place(newPlace).save();

    res.status(201).json({place, message: 'Place was added!'});
  } catch (err) {
    errorHandler(res, err);
  }
}

