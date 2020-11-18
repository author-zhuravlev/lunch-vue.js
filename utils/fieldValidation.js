const {validationResult} = require('express-validator');

module.exports = (req, res, message = 'Incorrect data!') => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    console.log(errors);

    res.status(400).json({
      errors: errors.array(),
      message
    });
  }
}
