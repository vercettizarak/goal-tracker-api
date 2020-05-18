const express = require('express');
const User = require('../models/user');
const Year = require('../models/year');
const route = express.Router();
const auth = require('../middleware/auth');

//@route    POST api/yearly
//@desc     Post year data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Retrive data
  const { data, num } = req.body;
  //Check data
  if (!data) return res.status(400).send('Please add valid data');
  try {
    //get user
    const user = await User.findById(req.user._id);

    //save data
    const year = new Year({
      data,
      user: req.user._id,
      num: user.status.year + 1,
    });

    //save year
    await year.save();

    //Update status.year
    user.status.year++;
    await user.save();

    //send response
    res.send(`Year ${year.num} saved`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    Post api/yearly
//@desc     Post year data
//@access   Private
route.get('/:num', auth, async (req, res) => {
  try {
    //Check year
    const year = await Year.findOne({
      num: req.params.num,
      user: req.user._id,
    });

    if (!year) return res.status(400).send('Year not found');

    //send Year
    res.json(year);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@route    Post api/yearly
//@desc     Post year data
//@access   Private
route.get('/', auth, async (req, res) => {
  try {
    //Check year
    const years = await Year.find({ user: req.user._id });

    if (!years) return res.status(400).send('Year not found');

    //send Year
    res.send(years);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
module.exports = route;
