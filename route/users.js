const express = require('express');
const route = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

// @route   POST api/users
// @desc    Register a user
// @access  Public
route.post('/', async (req, res) => {
  //Retrive data from the body
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'Please include Valid information' });
  }

  try {
    //Check if the user exist
    if ((await User.findOne({ email })) !== null) {
      return res.json({ msg: 'User already exists' });
    }

    //If doesn't Create User
    let user = new User({ name, email, password });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Save user in database
    await user.save();

    //Create a token
    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '1d',
    });

    //send a token
    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route  api/users
//desc    get user
//access  Private
route.get('/', auth, async (req, res) => {
  try {
    //check and user from database
    const user = await User.findById(req.user._id).select('-password');

    //send user
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
