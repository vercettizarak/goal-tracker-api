const express = require('express');
const route = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

// @route   POST api/user
// @desc    Register a user
// @access  Public
route.post('/', async (req, res) => {
  //Retrive data from the body
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send('Please include Valid information');
  }

  try {
    //Check if the user exist
    if ((await User.findOne({ email })) !== null) {
      return res.send('User already exists');
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
    res.send(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route  api/user
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

//@route  api/user/status
//desc    get user status
//access  Private
route.get('/status', auth, async (req, res) => {
  try {
    //check and user from database
    const user = await User.findById(req.user._id).select('-password');

    //send user
    res.json({ status: user.status });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

route.put('/', auth, async (req, res) => {
  //Retrive data from the body
  const { name, email, mission } = req.body;

  //check if valid
  if (!name || !email || !mission) {
    res.status(400).send('Please include Valid information');
  }
  try {
    //check if the user exist
    const user = await await User.findById(req.user._id);

    if (!user) return res.status(404).send('User not found');

    //Change data
    (user.name = name),
      (user.email = email),
      (user.mission = mission),
      //save
      user.save();

    //send a response
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
