const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const generateToken = (_id, type, expiresIn) => jwt.sign(
  {_id, type},
  config.get('jwt').secret,
  {expiresIn}
);

const generateTokens = userId => {
  const newAccessToken = generateToken(
    userId,
    config.get('jwt').tokens.access.type,
    config.get('jwt').tokens.access.expiresIn
  );
  const newRefreshToken = generateToken(
    userId,
    config.get('jwt').tokens.refresh.type,
    config.get('jwt').tokens.refresh.expiresIn
  );

  return {
    newAccessToken,
    newRefreshToken,
  }
}

const setRefreshTokenCookie = (res, refreshToken) => {
  const {
    name,
    path,
    maxAge,
    httpOnly,
    secure
  } = config.get('cookies').refreshToken;

  res.cookie(
    name,
    refreshToken,
    {path, maxAge, httpOnly} //+ secure: true (only https)
  );
}

const updateRefreshTokenInDB = async (_id, newRefreshToken) => {
  await User.findOneAndUpdate(
    {_id},
    {
      $set: {
        refreshToken: newRefreshToken
      }
    }
  );
}

module.exports = {
  generateTokens,
  updateRefreshTokenInDB,
  setRefreshTokenCookie
}
