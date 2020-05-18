const express = require('express');
const Day = require('../models/day');
const User = require('../models/user');
const auth = require('../middleware/auth');
const route = express.Router();
const moment = require('moment');

//@route    POST api/days
//@desc     Post day data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Check data
  const { data, tasks } = req.body;
  if (!data) {
    res.status(400).send('Please add valid data');
  }
  try {
    //get day from user
    const user = await User.findById(req.user._id);

    //create and save day
    const day = new Day({
      user: req.user._id,
      data,
      tasks,
      num: user.status.day + 1,
    });

    //Save day
    await day.save();

    //Update status.day
    user.status.day++;
    await user.save();

    //Send a response
    res.send(`Day ${user.status.day} saved`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/days
//@desc     Get days data
//@access   Private
route.get('/', auth, async (req, res) => {
  try {
    //Check if there is day
    const days = await Day.find({ user: req.user._id });

    if (!days) return res.status(404).send('Day not found');

    //send Day
    res.send(days);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/daily
//@desc     Get day data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check if there is day
    const day = await Day.findOne({ user: req.user._id, num: req.params.num });

    if (!day) return res.status(404).send('Day not found');

    //send Day
    res.send(day);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
