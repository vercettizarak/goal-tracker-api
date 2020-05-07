const express = require('express');
const auth = require('../middleware/auth');
const Week = require('../models/week');

const route = express.Router();

//@route    POST api/week
//@desc     Post week data
//@access   Private
route.post('/', auth, async (req, res) => {
  //Check data
  const { data, num } = req.body;
  if (!data || !num) return res.json({ msg: 'Please add valid data' });
  try {
    //create and save week
    const week = new Week({ data, num, user: req.user._id });

    await week.save();

    //send a Response
    res.send('Week Saved');
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

module.exports = route;
