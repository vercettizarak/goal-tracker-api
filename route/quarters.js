const express = require('express');
const User = require('../models/user');
const Quarter = require('../models/quarter');
const route = express.Router();
const auth = require('../middleware/auth');

//@route    POST api/quarters
//@desc     Post day data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Retrive data
  const { data, num } = req.body;
  //Check data
  if (!data) return res.status(400).send('Please add valid data');
  try {
    //get user
    const user = await User.findById(req.user._id);

    //ceate and save data
    const quarter = new Quarter({
      data,
      user: req.user._id,
      num: user.status.quarter + 1,
    });

    //save quarter
    await quarter.save();

    //Update status.quarter
    user.status.quarter++;
    await user.save();

    //send response
    res.send(`Quarter ${quarter.num} saved`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/quarters
//@desc     Get Quarterly data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check quater
    const quarter = await Quarter.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!quarter) return res.status(404).send('Quarter not found');

    //send Quarter
    res.json(quarter);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/quarters
//@desc     Get Quarterly data
//@access   Private
route.get('/', auth, async (req, res) => {
  try {
    //Check quater
    const quarter = await Quarter.find({ user: req.user._id });

    if (!quarter) return res.status(404).send('Quarter not found');

    //send Quarter
    res.json(quarter);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
});

module.exports = route;
