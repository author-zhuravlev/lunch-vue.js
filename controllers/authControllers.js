const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const fieldValidation = require('../utils/fieldValidation');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const {
  generateTokens,
  updateRefreshTokenInDB,
  setRefreshTokenCookie
} = require('../utils/authHelper');

module.exports.login = async (req, res) => {
  try {
    fieldValidation(req, res, config.get('info').incorrectFormData);

    const {email, password} = req.body;

    const candidate = await User.findOne({email});

    if (candidate) {
      const result = bcrypt.compareSync(password, candidate.password);

      if (result) {
        const {
          newAccessToken,
          newRefreshToken,
        } = generateTokens(candidate._id);

        await updateRefreshTokenInDB(
          { _id: candidate._id},
          newRefreshToken
        );

        setRefreshTokenCookie(res, newRefreshToken);

        res.status(200).json({
          accessToken: `Bearer ${newAccessToken}`,
          placesStatus: candidate.placesStatus
        });
      } else {
        res.status(400).json({message: config.get('info').incorrectFormData});
      }
    } else {
      res.status(400).json({message: config.get('info').notFound});
    }
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.registration = async (req, res) => {
  try {
    fieldValidation(req, res, config.get('info').conflict);

    const { name, email, password } = req.body;

    const candidate = await User.findOne({email});

    if (candidate) {
      return res.status(409).json({
        message: 'This user already exists!'
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        name,
        email,
        password: hashedPassword
      });

      const {
        newAccessToken,
        newRefreshToken,
      } = generateTokens(user._id);

      user.refreshToken = newRefreshToken;

      const savedUser = await user.save();

      setRefreshTokenCookie(res, newRefreshToken);

      res.status(201).json({
        accessToken: `Bearer ${newAccessToken}`,
        placesStatus: savedUser.placesStatus
      });
    }
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.logout = async (req, res) => {
  try {
    const {refreshToken} = req.cookies;

    const {payload: {_id}} = jwt.decode(refreshToken, {complete: true});

    await updateRefreshTokenInDB(_id, '');

    const {name, path} = config.get('cookies').refreshToken;

    res.cookie(name, '', {path, expires: new Date(0)});
    res.status(200).json({message: 'Log out'});
  } catch (err) {
    errorHandler(res, err);
  }
}

module.exports.refreshToken = async (req, res) => {
  try {
    const {refreshToken} = req.cookies;

    jwt.verify(
      refreshToken,
      config.get('jwt').secret,
      async function (err, decoded) {
        if (err) {
          res.status(401).json(err);
        } else {
          const {_id} = decoded;

          const {
            newAccessToken,
            newRefreshToken
          } = generateTokens(_id);

          await updateRefreshTokenInDB(_id, newRefreshToken);

          setRefreshTokenCookie(res, newRefreshToken);
          res.status(200).json({accessToken: `Bearer ${newAccessToken}`});
        }
      }
    );
  } catch (err) {
    errorHandler(res, err);
  }
}
