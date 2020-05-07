const express = require('express');
const route = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route  Post api/auth
//@desc   Logged in User
//@acess  Public
route.post('/', async (req, res) => {
  //Retrive data from the body
  const { email, password } = req.body;

  //check if there's valid information
  if (!email || !password) {
    return res.status(400).send('Please introduce valide information');
  }

  try {
    //Get the user and compare the password
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send('User not found');

    //create a json web token and respond
    const payload = {
      user: {
        _id: user._id,
      },
    };

    const token = jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: '1d',
    });

    res.json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
