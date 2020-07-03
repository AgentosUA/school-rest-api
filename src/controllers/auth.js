const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.length < 1) {
      return res.status(401).json({
        error: 'Auth error!',
        status: 401,
      });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (compare) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.secretTokenKey,
        {
          expiresIn: '1h',
        }
      );

      return res.status(200).json({
        status: 200,
        token: token,
        userId: user.id,
      });
    }

    return res.status(401).json({
      error: 'Auth error!',
      status: 401,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wront on the server!',
      status: 500,
    });
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let checkUser = await User.find({ email });
    if (checkUser.length > 0) {
      return res.status(401).json({
        message: 'User already exists',
        status: 401,
      });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();
    res.status(201).json({
      message: 'User created successfully!',
      status: 201
    });
  } catch (err) {
    res.status(401).json({
      error: 'Auth error!',
      status: 401,
    });
  }
};
