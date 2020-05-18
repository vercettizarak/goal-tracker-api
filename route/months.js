const express = require('express');
const auth = require('../middleware/auth');
const route = express.Router();
const User = require('../models/user');
const Month = require('../models/month');

//@route    POST api/months
//@desc     Post Month data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Retrive data
  const { data, num } = req.body;
  //Check data
  if (!data) return res.status(400).send('Please add valid data');
  try {
    //get day from user
    const user = await User.findById(req.user._id);

    //create and save data
    const month = new Month({
      data,
      user: req.user._id,
      num: user.status.month + 1,
    });

    await month.save();

    //Update status.month
    user.status.month++;
    await user.save();
    //send response
    res.send(`Month ${month.num} saved`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/months
//@desc     Get Month data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check month
    const month = await Month.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!month) return res.status(404).send('Month not found');

    //send month
    res.json(month);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/months
//@desc     Get Month data
//@access   Private
route.get('/', auth, async (req, res) => {
  try {
    //Check month
    const months = await Month.find({ user: req.user._id });

    if (!months) return res.status(404).send('Month not found');

    //send month
    res.json(months);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = route;
