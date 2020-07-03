const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.secretTokenKey
    );
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Auth error!',
      status: 401,
    });
  }
};
