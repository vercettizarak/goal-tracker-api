const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //Get token from tha header
  const token = req.header('x-auth-token');

  try {
    //Verify and decode the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: 'Access Denied invalid token' });
  }
};
