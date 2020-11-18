module.exports = (res, err) => {
  console.log(err);

  res.status(500).json({
    success: false,
    message: err.message || err || `The server is temporarily down due to a UFO attack! We do our best to restore the connection`
  });
}
