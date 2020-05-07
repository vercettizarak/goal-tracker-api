const express = require('express');
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
  if (!data || !num) return res.status(400).send('Please add valid data');
  try {
    //save data
    const year = new Year({ data, num, user: req.user._id });
    await year.save();

    //send response
    res.json({ msg: `Year ${num} saved` });
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

    if (!year) return res.status(400).json({ msg: 'Year not found' });

    //send Year
    res.json(year);
  } catch (err) {
    console.error(err);
    res.status(500).json({ send: 'Server Error' });
  }
});

module.exports = route;
