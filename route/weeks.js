const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const Week = require('../models/week');

const route = express.Router();

//@route    POST api/week
//@desc     Post week data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Check data
  const { data, goals } = req.body;
  if (!data) return res.send('Please add valid data');
  try {
    //get user
    const user = await User.findById(req.user._id);

    //create and save week
    const week = new Week({
      data,
      goals,
      user: req.user._id,
      num: user.status.week + 1,
    });

    //save week
    await week.save();

    //Update status.week
    user.status.week++;
    await user.save();

    //send a Response
    res.send(`Week ${week.num} saved`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/week
//@desc     Get week data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //check if there is Week
    const week = await Week.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!week) return res.status(404).send('Week not found');

    //send week
    res.json(week);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

route.get('/', auth, async (req, res) => {
  try {
    //check if there is Week
    const weeks = await Week.find({ user: req.user._id });

    if (!weeks) return res.status(404).send('Week not found');

    //send week
    res.json(weeks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = route;
