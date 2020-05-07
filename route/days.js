const express = require('express');
const Day = require('../models/day');
const User = require('../models/user');
const auth = require('../middleware/auth');
const route = express.Router();
const moment = require('moment');

//@route    POST api/daily
//@desc     Post day data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Check data
  const { data, num } = req.body;
  if (!data) {
    res.status(400).json('Please add valid data');
  }
  try {
    //create and save day
    const day = new Day({ user: req.user._id, data, num: user.status.day + 1 });

    /*To solve when the app is complete
    //get day from user
    const user = await User.findById(req.user._id);
    //check if it is same day
    const lastDay = await Day.find().sort({ date: -1 }).limit(1);
    const toDay = moment(day.date);
    const yest = moment(lastDay.date);
    //if (sameDay) return res.status(400).send('Day already posted');
    */
    //Save day
    await day.save();

    //Update status.day
    user.status.day++;
    await user.save();

    //Send a response
    res.json({ msg: 'Day saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route    GET api/daily
//@desc     Get day data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check if there is day
    const day = await Day.findOne({ num: req.params.num, user: req.user._id });

    if (!day) return res.status(404).json({ msg: 'Day not found' });

    //send Day
    res.json(day);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
