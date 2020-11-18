const {Router} = require('express');
const passport = require('passport');
const {check} = require('express-validator');
const homeControllers = require('../controllers/homeControllers');

const router = Router();

router.get(
  '/get-places',
  passport.authenticate('jwt', {session: false}),
  homeControllers.getPlaces
);
router.post(
  '/get-rating',
  passport.authenticate('jwt', {session: false}),
  homeControllers.getRating
);
router.post(
  '/add-voting-result',
  passport.authenticate('jwt', {session: false}),
  homeControllers.addVotingResult
);
router.post(
  '/search-voting-result',
  passport.authenticate('jwt', {session: false}),
  homeControllers.searchVotingResult
);
router.patch(
  '/update-place-rating',
  passport.authenticate('jwt', {session: false}),
  homeControllers.updatePlaceRating
);
router.delete(
  '/delete-place',
  passport.authenticate('jwt', {session: false}),
  homeControllers.deletePlace
);
router.post(
  '/add-place',
  passport.authenticate('jwt', {session: false}),
  [
    check('address', 'Enter the address!').isString(),
    check('linkToMenu', 'Enter the link to the place menu!').isString(),
    check('description', 'Enter a description of the place!').isString(),
    check('name ', 'Enter the name of the place!').isString()
  ],
  homeControllers.addPlace
);

module.exports = router;
