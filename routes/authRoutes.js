const {Router} = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/authControllers');

const router = Router();

router.post(
  '/auth/login',
  [
    check('email', 'Incorrect email!').isEmail(),
    check('password', 'The min password length is 6 characters!').isLength({ min: 6 })
  ],
  authControllers.login
);
router.post(
  '/auth/registration',
  [
    check('name', 'Incorrect name!').isLength({min: 2}),
    check('email', 'Incorrect email!').isEmail(),
    check('password', 'The min password length is 6 characters!').isLength({min: 6})
  ],
  authControllers.registration
);
router.get(
  '/auth/logout',
  authControllers.logout
);
router.get(
  '/auth/refresh-token',
  authControllers.refreshToken
);

module.exports = router;
